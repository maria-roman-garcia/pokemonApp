import React, { useEffect, useContext, useState } from 'react';
import './PrincipalPage.scss';
import Context from '../Context/Context';
import { Link } from 'react-router-dom';
//Reactstrap
import { Table } from 'reactstrap';
import { Spinner } from 'reactstrap';
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
//Components
import Menu from '../Menu/Menu';
import Experience from '../Commons/Experience';

const PrincipalPage = () => {

    // context
    const contextComponent = useContext(Context);
    const contextComponentValue = contextComponent.contextInfo;
    const setContextComponentValue = contextComponent.setContextInfo;

    useEffect(() => { // API call and set the results in the context depending on pagination
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${20}&offset=${20 * (contextComponentValue.paginationSelected - 1)}`)
            .then(urlInfo => {
                return urlInfo.json();
            }).then(allData => {
                let promises = allData.results.map(e => fetch(e.url).then(response => response.json())); //Get pokemon detail
                Promise.all(promises).then(values => {
                    const toReturn = allData.results.map((e, index) => {
                        return {
                            ...e,
                            ...values[index]
                        }
                    });
                    setContextComponentValue({
                        ...contextComponentValue,
                        count: allData.count,
                        pokemonResults: toReturn,
                        loading: false
                    });
                })
            })
            .catch(error => {
                console.error(error);
            });
    }, [contextComponentValue.paginationSelected]);

    //icons fontawesome
    const sortUp = <FontAwesomeIcon icon={faSortUp} color="#454545" size="2x" />
    const sortDown = <FontAwesomeIcon icon={faSortDown} color="#454545" size="2x" />
    const [showMoves, setShowMoves] = useState([]);

    const addIndexShowMoves = (index) => {
        setShowMoves([...showMoves, index]);
    }
    const deleteIndexShowMoves = (index) => {
        const newData = [...showMoves];
        const toDelete = newData.indexOf(index);
        newData.splice(toDelete, 1);
        setShowMoves(newData);
    }

    return (
        <div className="PrincipalPage maxScreenSize">
            {contextComponentValue.loading
                ? <Spinner color="info" />
                : <>
                    <Menu />
                    <div className="row justifyCenter">
                        {contextComponentValue.pokemonResults.map((pokemon, pokemonIndex) => <div key={"pokemonIndex_" + pokemonIndex} className="col-12 col-lg-4 cardContainer">
                            <div className="card sombra">
                                <div className="row">
                                    <div className="col-6">
                                        <p className="bold">{pokemon.name.toUpperCase()}</p>
                                    </div>
                                    <div className="col-6 justifyEnd">
                                        <p className="bold pokemonNumber alignCenter"># {pokemon.id}</p>
                                    </div>
                                </div>
                                <div className="row justifyEnd">
                                    <Experience experience={pokemon.base_experience} />
                                </div>
                                <div className="justifyCenter" style={{ marginBottom: "15px" }}>
                                    <img width="80%" src={pokemon.sprites.other.dream_world.front_default} alt="Card image cap" />
                                </div>
                                <p><span className="bold">Abilities:</span> {pokemon.abilities.map((e, indexAbilities) => <span key={"indexAbilities_" + indexAbilities} className="ability">{e.ability.name}</span>)}</p>
                                <p><span className="bold">Types:</span> {pokemon.types.map((e, indexType) => <span className="type" key={"type_" + indexType}>{e.type.name}</span>)}</p>
                                <Table striped bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Stat</th>
                                            <th>base</th>
                                            <th>Effort</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pokemon.stats.map((e, indexPokDetail) =>
                                            <tr key={"indexPokDetail_" + indexPokDetail}>
                                                <th scope="row">{indexPokDetail + 1}</th>
                                                <td>{e.stat.name}</td>
                                                <td>{e.base_stat}</td>
                                                <td>{e.effort}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                <div className="row justifySpaceBeteween alignCenter pointer" onClick={() => showMoves.some(e => e === pokemonIndex) ? deleteIndexShowMoves(pokemonIndex) : addIndexShowMoves(pokemonIndex)}>
                                    <div className="col-6">
                                        <p className="bold">Moves:</p>
                                    </div>
                                    <div className="col-6 justifyEnd">
                                        <span>{showMoves.some(e => e === pokemonIndex) ? sortDown : sortUp}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    {showMoves.some(e => e === pokemonIndex) && pokemon.moves.map((e, indexMove) =>
                                        <p key={indexMove} className="col move">{e.move.name}</p>
                                    )}
                                </div>
                                <div className="row button justifyCenter alignCenter">
                                    <Link to={`./pokemonDetailed/?pokemonId=${pokemon.id}`} className="widthFit">
                                        <p>See more details</p>
                                    </Link>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </>
            }
        </div>
    )
}

export default PrincipalPage;
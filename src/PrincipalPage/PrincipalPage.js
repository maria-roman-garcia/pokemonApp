import React, { useEffect, useContext, useState } from 'react';
import './PrincipalPage.scss';
import Context from '../Context/Context';
import {Link} from 'react-router-dom';
//Reactstrap
import { Table } from 'reactstrap';
import { Spinner } from 'reactstrap';
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
//Components
import Menu from '../Menu/Menu';

const PrincipalPage = () => {

    // context
    const contextComponent = useContext(Context);
    const contextComponentValue = contextComponent.contextInfo;
    const setContextComponentValue = contextComponent.setContextInfo;

    useEffect(() => { // API call and set the results in the context depending on pagination
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${20}&offset=${20*(contextComponentValue.paginationSelected-1)}`)
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
                setContextComponentValue({...contextComponentValue,
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

    const colorPercentage = (percentage) => {
        if (percentage <= 20) {
            return "#e68020"
        } else if (percentage <= 40) {
            return "#e6b820"
        } else if (percentage <= 60) {
            return "#e3e620"
        } else if (percentage <= 80) {
            return "#b8e620"
        } else {
            return "#11af26"
        }
    }

    //icons fontawesome
    const flechaArriba = <FontAwesomeIcon icon={faSortUp} color="#454545" size="2x" />
    const flechaAbajo = <FontAwesomeIcon icon={faSortDown} color="#454545" size="2x" />
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
                    <Menu/>
                    <div className="row justifyCenter">
                        {contextComponentValue.pokemonResults.map((pokemon, pokemonIndex) => <div key={"pokemonIndex_"+pokemonIndex} className="col-12 col-lg-4 cardContainer">
                            <div className="card">
                                <div className="row">
                                    <p><span className="bold">Pokemon {pokemon.id}: </span>{pokemon.name}</p>
                                </div>
                                <div className="row justifyEnd">
                                    <div className="experience">
                                        <div className="circle">
                                            <svg viewBox="0 0 36 36" className="circular-chart">
                                                <path className="circle"
                                                    strokeDasharray={`${pokemon.base_experience},100`}
                                                    d="M18 2.0845
                                                    a 15.9155 15.9155 0 0 1 0 31.831
                                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    stroke={colorPercentage(pokemon.base_experience)} />
                                            </svg>
                                        </div>
                                        <p className="experienceNumber">{pokemon.base_experience}</p>
                                    </div>
                                </div>
                                <div className="justifyCenter">
                                    <img width="80%" src={pokemon.sprites.other.dream_world.front_default} alt="Card image cap" />
                                </div>
                                <p><span className="bold">Abilities:</span> {pokemon.abilities.map((e, indexAbilities) => <span key={"indexAbilities_"+indexAbilities} className="ability">{e.ability.name}</span>)}</p>
                                <p><span className="bold">Types:</span> {pokemon.types.map((e, indexType) => <span className="type" key={"type_"+indexType}>{e.type.name}</span>)}</p>
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
                                            <tr key={"indexPokDetail_"+indexPokDetail}>
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
                                        <span>{showMoves.some(e => e === pokemonIndex) ? flechaAbajo : flechaArriba}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    {showMoves.some(e => e === pokemonIndex) && pokemon.moves.map((e, indexMove) =>
                                        <p key={indexMove} className="col move">{e.move.name}</p>
                                    )}
                                </div>
                                <div className="row">
                                    <Link to={`./pokemonDetailed/?pokemonId=${pokemon.id}`}>
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
import React, { useContext, useEffect, useState } from 'react';
import './PokemonDetailed.scss';
import { useLocation } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
//Context
import Context from '../Context/Context';
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
//Componentes
import GetUrlParams from './GetUrlParams';
import Ability from './Ability';
import Move from './Move';
import Species from './Species';
import Stats from './Stats';

const PokemonDetailed = () => {

    // context
    const contextComponent = useContext(Context);
    const contextComponentValue = contextComponent.contextInfo;

    //icons fontawesome
    const backArrow = <FontAwesomeIcon icon={faChevronLeft} color="#454545" size="2x" />

    //Data
    const [pokemonSelected, setPokemonSelected] = useState({
        loading: true
    });

    //Get url params to fetch data
    const ourUrl = useLocation();
    useEffect(() => {
        const id = GetUrlParams(ourUrl);
        let dataToReturn = undefined;
        if (((contextComponentValue || {}).pokemonResults || []).length !== 0) {
            dataToReturn = contextComponentValue.pokemonResults.find(e => e.id === parseInt(id));
            setPokemonSelected({
                ...dataToReturn,
                imgToLoad: [
                    dataToReturn.sprites.back_default,
                    dataToReturn.sprites.front_shiny,
                    dataToReturn.sprites.back_shiny,
                    dataToReturn.sprites.front_default
                ],
                loading: false
            });
        } else {
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(urlInfo => {
                    return urlInfo.json();
                }).then(allData => {
                    dataToReturn = allData;
                    setPokemonSelected({
                        ...dataToReturn,
                        imgToLoad: [
                            dataToReturn.sprites.back_default,
                            dataToReturn.sprites.front_shiny,
                            dataToReturn.sprites.back_shiny,
                            dataToReturn.sprites.front_default
                        ],
                        loading: false
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

    const [backgroundPokemon, setBackgroundPokemon] = useState(`linear-gradient(rgba(255,255,255,.7), rgba(255,255,255,.7))`)
    useEffect(() => {
        if (!pokemonSelected.loading) {
            setBackgroundPokemon(`linear-gradient(rgba(255,255,255,.7), rgba(255,255,255,.7)), url(${pokemonSelected.imgToLoad[3]})`)
        }
    }, [pokemonSelected.loading]);

    //Img pokemon change every sec
    let i = 0;
    const [pokemonChange, setPokemonChange] = useState();
    useEffect(() => {
        if (!pokemonSelected.loading) {
            const interval = setInterval(() => {
                setPokemonChange(pokemonSelected.imgToLoad[i]);
                if (i < 3) {
                    i = i + 1;
                } else {
                    i = 0;
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [pokemonSelected.loading]);

    //Menu
    const [menuSelected, setMenuSelected] = useState(1);
    const menuSections = [
        {
            id: 1,
            name: "About"
        },
        {
            id: 2,
            name: "Ability"
        },
        {
            id: 3,
            name: "Moves"
        },
        {
            id: 4,
            name: "Stats"
        }
    ]

    const renderMenuItemSelected = (section) => {
        if (section === 1) {
            return <Species name={pokemonSelected.species.name} url={pokemonSelected.species.url} experience={pokemonSelected.base_experience} imgPokemon={pokemonChange} />
        } else if (section === 2) {
            return <div>{pokemonSelected.abilities.map(e => <Ability name={e.ability.name} url={e.ability.url} />)}</div>
        } else if (section === 3) {
            return <div>{pokemonSelected.moves.map(e => <Move name={e.move.name} url={e.move.url} />)}</div>
        } else if (section === 4) {
            return <Stats stats={pokemonSelected.stats} />
        } else {
            return "No section avaiable"
        }
    }

    return (
        <div className="PokemonDetailed maxScreenSize justifyCenter" style={{ background: backgroundPokemon }}>
            {pokemonSelected.loading
                ? <Spinner color="info" />
                : <div className="pokemonCard sombra">
                    <div className="justifySpaceBeteween alignCenter title">
                        <Link to="/">
                            <span>{backArrow}</span>
                        </Link>
                        <p className="bold">{pokemonSelected.species.name.toUpperCase()} #{pokemonSelected.id}</p>
                    </div>
                    <div className="row justifyCenter imgRow">
                        <img src={pokemonChange} alt="imgPokemon" />
                    </div>
                    <div className="row menu justifyCenter">
                        {menuSections.map((menuItem, indexMenu) => <p key={indexMenu} className={menuSelected === menuItem.id && "menuActive"} onClick={() => setMenuSelected(menuItem.id)}>{menuItem.name}</p>)}
                    </div>
                    {renderMenuItemSelected(menuSelected)}
                </div>
            }
        </div>
    )
}

export default PokemonDetailed;
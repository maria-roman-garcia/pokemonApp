import React, { useContext, useEffect, useState } from 'react';
import './PokemonDetailed.scss';
import { useLocation } from 'react-router-dom';
import { Spinner } from 'reactstrap';
//Context
import Context from '../Context/Context';
//Componentes
import GetUrlParams from './GetUrlParams';
import Ability from './Ability';
import Move from './Move';
import Species from './Species';
import Experience from '../Commons/Experience';

const PokemonDetailed = () => {

    // context
    const contextComponent = useContext(Context);
    const contextComponentValue = contextComponent.contextInfo;

    const [pokemonSelected, setPokemonSelected] = useState({
        loading: true
    });

    //Get url params
    const ourUrl = useLocation();
    useEffect(() => {
        const id = GetUrlParams(ourUrl);
        const dataToReturn = contextComponentValue.pokemonResults.find(e => e.id === parseInt(id));
        setPokemonSelected({
            ...dataToReturn,
            loading: false,
            imgToLoad: [
                dataToReturn.sprites.back_default,
                dataToReturn.sprites.front_shiny,
                dataToReturn.sprites.back_shiny,
                dataToReturn.sprites.front_default
            ]
        });
    }, []);

    return (
        <div className="PokemonDetailed maxScreenSize">
            {pokemonSelected.loading
                ? <Spinner color="info" />
                : <>
                    <div className="row textCenter">
                        <p className="bold">{pokemonSelected.species.name.toUpperCase()}</p>
                    </div>
                    <div className="row justifyCenter imgRow">
                        {pokemonSelected.imgToLoad.map((e,indexImg) => <img key={indexImg} src={e} alt="imgPokemon" />)}
                        <Experience experience={pokemonSelected.base_experience}/>
                    </div>
                    <Species name={pokemonSelected.species.name} url={pokemonSelected.species.url} />
                    <p>Abilities:</p>
                    {(pokemonSelected.abilities || []).map(e => <Ability name={e.ability.name} url={e.ability.url} />)}
                    <p>Moves:</p>
                    {(pokemonSelected.moves || []).map(e => <Move name={e.move.name} url={e.move.url} />)}
                </>}
        </div>
    )
}

export default PokemonDetailed;
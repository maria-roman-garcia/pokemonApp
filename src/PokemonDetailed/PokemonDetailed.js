import React, { useContext, useEffect, useState } from 'react';
import './PokemonDetailed.scss';
import { useLocation } from 'react-router-dom';
//Context
import Context from '../Context/Context';
//Componentes
import GetUrlParams from './GetUrlParams';

const PokemonDetailed = () => {

    // context
    const contextComponent = useContext(Context);
    const contextComponentValue = contextComponent.contextInfo;
    const setContextComponentValue = contextComponent.setContextInfo;

    const[pokemonSelected, setPokemonSelected]= useState(1);
    const[pokemonAbilities, setPokemonAbilities]=useState(undefined);

    //Get url params
    const ourUrl = useLocation();
    useEffect(() => {
        const id = GetUrlParams(ourUrl);
        setPokemonSelected(contextComponentValue.pokemonResults.find(e => e.id === parseInt(id)));
    }, []);

    return (
        <div className="PokemonDetailed maxScreenSize">
            <div className="row justifyCenter">
                <p>{pokemonSelected.name}</p>
            </div>
            <p>Abilities:</p>
            {pokemonSelected.abilities.map(e=><p>{e.ability.name}</p>)}
        </div>
    )
}

export default PokemonDetailed;
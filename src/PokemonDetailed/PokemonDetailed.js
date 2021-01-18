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

const PokemonDetailed = () => {

    // context
    const contextComponent = useContext(Context);
    const contextComponentValue = contextComponent.contextInfo;

    const [pokemonSelected, setPokemonSelected] = useState({
        data: {},
        loading: true
    });

    //Get url params
    const ourUrl = useLocation();
    useEffect(() => {
        const id = GetUrlParams(ourUrl);
        setPokemonSelected({
            data: contextComponentValue.pokemonResults.find(e => e.id === parseInt(id)),
            loading: false
        });
    }, []);

    console.log(JSON.stringify(contextComponentValue.pokemonResults))

    return (
        <div className="PokemonDetailed maxScreenSize">
            {pokemonSelected.loading
                ? <Spinner color="info" />
                : <>
                    <div className="row justifyCenter">
                        <p>{pokemonSelected.name}</p>
                    </div>
                    <Species name={(pokemonSelected.species||{}).name} url={(pokemonSelected.species||{}).url} />
                    <p>Abilities:</p>
                    {(pokemonSelected.abilities || []).map(e => <Ability name={e.ability.name} url={e.ability.url} />)}
                    <p>Moves:</p>
                    {(pokemonSelected.moves || []).map(e => <Move name={e.move.name} url={e.move.url} />)}
                </>}
        </div>
    )
}

export default PokemonDetailed;
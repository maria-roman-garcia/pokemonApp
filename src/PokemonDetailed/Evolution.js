import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';

const Evolution = (props) => {

    const [evolution, setEvolution] = useState({
        data: {},
        loading: true
    });

    useEffect(() => { 
        fetch(props.url)
            .then(urlInfo => {
                return urlInfo.json();
            }).then(allData => {
                setEvolution({
                    data: allData,
                    loading: false
                });
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="Evolution">
            {evolution.loading
                ? <Spinner color="info" />
                : <div style={{padding: "1rem", border: "1px solid gray", borderRadius: "5px", margin: "1rem"}}>
                    <p className="bold textCenter">{props.name.toUpperCase()}:</p>
                    <p>Evolution from: {evolution.data.chain.species.name}</p>
                    <p>Evolution: {evolution.data.chain.evolves_to.map(e=> e.species.name)}</p>
                    <p>Evolution to: {evolution.data.chain.evolves_to.map(e=> e.evolves_to.map(x => x.species.name))}</p>
                </div>
            }
        </div>
    )
}

export default Evolution;
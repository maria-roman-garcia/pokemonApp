import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

const Evolution = (props) => {

    //icons fontawesome
    const rightArrow = <FontAwesomeIcon icon={faChevronCircleRight} color="#454545" size="1x" />

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
                : <div>
                    <div className="row justifyCenter alignCenter" style={{margin: "1rem 0"}}>
                        <p className="bold">{props.name}:</p>
                    </div>
                    <div className="row justifyCenter alignCenter">
                        <p className="blueLabel">Evolution 1: {evolution.data.chain.species.name}</p>
                        <span className="widthFit">{rightArrow}</span>
                        <p className="blueLabel">Evolution 2: {evolution.data.chain.evolves_to.map(e => e.species.name)}</p>
                        <span className="widthFit">{rightArrow}</span>
                        <p className="blueLabel">Evolution 3: {evolution.data.chain.evolves_to.map(e => e.evolves_to.map(x => x.species.name))}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Evolution;
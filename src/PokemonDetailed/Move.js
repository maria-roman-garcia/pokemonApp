import React, { useEffect, useState } from 'react';
import './Move.scss';
import { Spinner, Progress } from 'reactstrap';

const Move = (props) => {

    const [move, setMove] = useState({
        data: {},
        loading: true
    });

    useEffect(() => {
        fetch(props.url)
            .then(urlInfo => {
                return urlInfo.json();
            }).then(allData => {
                setMove({
                    data: allData,
                    loading: false
                });
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="Move">
            {move.loading
                ? <Spinner color="info" />
                : <div className="moves sombra">
                    <div className="row justifyCenter">
                        <p className="bold widthFit blueLabel">{props.name}:</p>
                    </div>
                    {move.data.accuracy !== null &&
                        <div className="row accuracy alignCenter">
                            <p className="bold">Accuracy:</p>
                            <div className="text-center widthFit">{move.data.accuracy}</div>
                            <Progress value={move.data.accuracy} color="info"/>
                        </div>
                    }
                    <p><span className="bold">Damage class:</span> {move.data.damage_class.name}</p>
                    <p><span className="bold">Effect:</span> {move.data.effect_entries.find(e => e.language.name === "en").effect}</p>
                </div>
            }
        </div>
    )
}

export default Move;
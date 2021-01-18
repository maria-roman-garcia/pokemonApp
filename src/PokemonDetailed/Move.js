import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';

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
                : <div style={{padding: "1rem", border: "1px solid gray", borderRadius: "5px", margin: "1rem"}}>
                    <p className="bold textCenter">{props.name.toUpperCase()}:</p>
                    <p>Accuracy: {move.data.accuracy}</p>
                    <p><span className="bold">Damage class:</span> {move.data.damage_class.name}</p>
                    <p><span className="bold">Effect:</span> {move.data.effect_entries.find(e => e.language.name === "en").effect}</p>
                </div>
            }
        </div>
    )
}

export default Move;
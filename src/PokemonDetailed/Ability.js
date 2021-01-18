import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';

const Ability = (props) => {

    const [ability, setAbility] = useState({
        data: {},
        loading: true
    });

    useEffect(() => { 
        fetch(props.url)
            .then(urlInfo => {
                return urlInfo.json();
            }).then(allData => {
                setAbility({
                    data: allData,
                    loading: false
                });
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="ability">
            {ability.loading
                ? <Spinner color="info" />
                : <div style={{padding: "1rem", border: "1px solid gray", borderRadius: "5px", margin: "1rem"}}>
                    <p className="bold textCenter">{props.name.toUpperCase()}:</p>
                    <p><span className="bold">Effect:</span> {ability.data.effect_entries.find(e => e.language.name === "en").effect}</p>
                </div>
            }
        </div>
    )
}

export default Ability;
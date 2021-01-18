import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';

const Species = (props) => {

    const [specie, setSpecie] = useState({
        data: {},
        loading: true
    });

    useEffect(() => { 
        fetch(props.url)
            .then(urlInfo => {
                return urlInfo.json();
            }).then(allData => {
                setSpecie({
                    data: allData,
                    loading: false
                });
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="Species">
            {specie.loading
                ? <Spinner color="info" />
                : <div style={{padding: "1rem", border: "1px solid gray", borderRadius: "5px", margin: "1rem"}}>
                    <p className="bold textCenter">{props.name.toUpperCase()}:</p>
                    <p><span className="bold">Happiness:</span> {specie.data.base_happiness}</p>
                </div>
            }
        </div>
    )
}

export default Species;
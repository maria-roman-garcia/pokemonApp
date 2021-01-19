import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
//Components
import Evolution from './Evolution';
import Rate from '../Commons/Experience';

const Species = (props) => {

    //icons fontawesome
    const iconYes = <FontAwesomeIcon icon={faCheckCircle} color="rgb(139, 211, 118)" size="1x" />
    const iconNo = <FontAwesomeIcon icon={faTimesCircle} color="rgb(255, 162, 162)" size="1x" />

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
                : <div>
                    <div className="alignCenter justifyCenter">
                        {specie.data.egg_groups.map((e, index) => <div className="alignCenter">
                            <p key={index} className="blueLabel">{e.name}</p>
                            {specie.data.egg_groups.length > index + 1 && <p style={{ marginBottom: "0" }}> + </p>}
                        </div>)}
                    </div>
                    <p style={{padding: "1rem"}}>{specie.data.flavor_text_entries[0].flavor_text} {specie.data.flavor_text_entries[2].flavor_text} {specie.data.flavor_text_entries[3].flavor_text} {specie.data.flavor_text_entries[4].flavor_text}</p>
                    <div className="row justifyCenter">
                        <div className="col-12 col-md-3 alignCenter" style={{ flexDirection: "column" }}>
                            <p className="bold">Happiness:</p>
                            <Rate experience={specie.data.base_happiness} normalRate={true} />
                        </div>
                        <div className="col-12 col-md-3 alignCenter" style={{ flexDirection: "column" }}>
                            <p className="bold">Capture rate:</p>
                            <Rate experience={specie.data.capture_rate} normalRate={true} />
                        </div>
                        <div className="col-12 col-md-3 alignCenter" style={{ flexDirection: "column" }}>
                            <p className="bold">Experience:</p>
                            <Rate experience={props.experience} />
                        </div>
                    </div>
                    <div className="row alignCenter justifyCenter" style={{ flexWrap: "wrap" }}>
                        <p className="blueLabel"><span className="bold">Growth rate:</span> {specie.data.growth_rate.name}</p>
                        <p className="blueLabel"><span className="bold">Habitat:</span> {specie.data.habitat.name}</p>
                        <p className="blueLabel"><span className="bold">Is baby:</span> {specie.data.is_baby ? iconYes : iconNo}</p>
                        <p className="blueLabel"><span className="bold">Is legendary:</span> {specie.data.is_legendary ? iconYes : iconNo}</p>
                        <p className="blueLabel"><span className="bold">Is mythical:</span> {specie.data.is_mythical ? iconYes : iconNo}</p>
                        <p className="blueLabel"><span className="bold">Color:</span> {specie.data.color.name}</p>
                    </div>
                    <Evolution name={"Evolution chain"} url={specie.data.evolution_chain.url} />
                </div>
            }
        </div>
    )
}

export default Species;
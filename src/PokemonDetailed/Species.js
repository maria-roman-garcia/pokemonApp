import React, { useEffect, useState } from 'react';
import './Species.scss';
import { Spinner } from 'reactstrap';
//Components
import Evolution from './Evolution';
import Rate from '../Commons/Experience';

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
                : <div style={{ padding: "1rem", border: "1px solid gray", borderRadius: "5px", margin: "1rem" }}>
                    <div className="row justifyCenter">
                        <div className="col-12 col-lg-3 alignCenter colRate">
                            <p className="bold">Happiness:</p>
                            <Rate experience={specie.data.base_happiness} normalRate={true}/>
                        </div>
                        <div className="col-12 col-lg-3 alignCenter colRate">
                            <p className="bold">Capture rate:</p>
                            <Rate experience={specie.data.capture_rate} normalRate={true}/>
                        </div>
                    </div>
                    <p className="bold textCenter">{props.name.toUpperCase()}:</p>
                    <p><span className="bold">Egg groups:</span> {specie.data.egg_groups.map(e => e.name)}</p>
                    <p><span className="bold">Growth rate:</span> {specie.data.growth_rate.name}</p>
                    <p><span className="bold">Habitat:</span> {specie.data.habitat.name}</p>
                    <p><span className="bold">Is baby:</span> {specie.data.is_baby ? "Yes" : "No"}</p>
                    <p><span className="bold">Is legendary:</span> {specie.data.is_legendary ? "Yes" : "No"}</p>
                    <p><span className="bold">Is mythical:</span> {specie.data.is_mythical ? "Yes" : "No"}</p>
                    <p><span className="bold">Color:</span> {specie.data.color.name}</p>
                    <Evolution name={"Evolution chain"} url={specie.data.evolution_chain.url} />
                </div>
            }
        </div>
    )
}

export default Species;
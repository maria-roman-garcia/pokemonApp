import React from 'react';
//Reactstrap
import { Table } from 'reactstrap';

const Stats = (props) => {
    return (
        <div className="Stats">
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Stat</th>
                        <th>base</th>
                        <th>Effort</th>
                    </tr>
                </thead>
                <tbody>
                    {props.stats.map((e, indexPokDetail) =>
                        <tr key={"indexPokDetail_" + indexPokDetail}>
                            <th scope="row">{indexPokDetail + 1}</th>
                            <td>{e.stat.name}</td>
                            <td>{e.base_stat}</td>
                            <td>{e.effort}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Stats;
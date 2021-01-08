import React from 'react';
import './TableData.css';
import numeral from 'numeral';


export const TableData = ({ countries }) => {
    return (
            <div className="table">
                {countries.map(({ country, cases }, ind) => (
                    <tr key={ind}>
                        <td>{country}</td>
                        <td>{numeral(cases).format("0,0")}</td>
                    </tr>

                ))}
        </div>
    )
}

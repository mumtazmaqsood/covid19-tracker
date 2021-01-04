import React from 'react';
import './TableData.css'

export const TableData = ({ countries }) => {
    return (
        <div className="table">
            {countries.map( ({ country, cases }) => (
            <tr>
                <td>{country}</td>
                <td>{cases}</td>
            </tr>

            ))}

        </div>
    )
}

import React from 'react';
import './TableData.css';


export const TableData = ({ countries }) => {
    return (
            <div className="table">
                {countries.map(({ country, cases }, ind) => (
                    <tr key={ind}>
                        <td>{country}</td>
                        <td>{cases}</td>
                    </tr>

                ))}
        </div>
    )
}

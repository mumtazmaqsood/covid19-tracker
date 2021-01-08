import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './infoBox.css'

export const InfoBox = ({ title, cases, total, ...props }) => {
    return (
        <Card onClick= {props.onClick} className="infoBox">
            <CardContent>
                {/*Title ==> Corona Virus cases*/}
                <Typography className="infoBox_title" color="textSecondary"> {title} </Typography>
                {/* No of Cases */}
                <h2 className="infoBox_cases">{cases} </h2>

                {/* Total Nos */}
                <Typography className="infoBox_total" color="textSecondary">{total} Total </Typography>
            </CardContent>

        </Card>
    )
}

import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

export const InfoBox = ({ title, cases, total }) => {
    return (
        <Card className="infoBox">
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

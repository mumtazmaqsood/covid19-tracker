import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './infoBox.css'


//active props is comming from App.js and sending values ture or false
//this value helps to change css run and change box color 
// if active = true then apply infoBox--selected css also isRed passed 
// if active is true and isRed is true then apply first apply infoBox--selected class and then
// change border color 
//else active is true and isRed is false then only apply infoBox--selected class which has 
//green color
export const InfoBox = ({ title, cases, active, isRed, total,  ...props }) => {
    console.log("active", active)
    return (
        <Card onClick={props.onClick}
            className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
            <CardContent>
                {/*Title ==> Corona Virus cases*/}
                <Typography className="infoBox_title" color="textSecondary"> {title} </Typography>
                {/* No of Cases, if isRed is not true then apply infoBox_cases--green class */}
                <h2 className={`infoBox_cases ${!isRed && "infoBox_cases--green"}`}>{cases} </h2>
                {/* Total Nos */}
                <Typography className="infoBox_total" color="textSecondary">{total} Total </Typography>
            </CardContent>

        </Card>
    )
}

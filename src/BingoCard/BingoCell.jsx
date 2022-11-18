import React, { Fragment, useState } from "react";
import Card from 'react-bootstrap/Card';
import Paper from '@mui/material/Paper';



export const BingoCell = (props) => {

    const defaultColor  = {
        color: "white",
        backgroundColor: "#757575" 
    };

    const checkedColor = {
        color: "white",
        backgroundColor: "#00ff00"
    };


   // const classes = useStyles(); style={checked ? checkedColor : defaultColor}
    const center = props.number === 0;
    const checked = center || props.checked;

    return (
        <Card className="bingo-cell" bg={checked ? "warning" : "info"}>
            {center ? "Free" : props.number}
        </Card>
    );
};
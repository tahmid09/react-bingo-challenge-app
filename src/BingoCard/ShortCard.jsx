import React, { Fragment, useState } from "react";

import Paper from '@mui/material/Paper';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

export const ShortCard = ({ list,
    ...props }) => {
   /// const [todos, dispatch] = useReducer(reducer, initialTodos);


    return (
        <Fragment>
             <Card style={{ width: '90%', margin: "2px auto" }}>


      


  <div >
                {
        
                
                    list.map((row, ridx) => (<Badge className="bingo-short" key={ridx} bg="danger">
                     {row}
                  </Badge>
                  ))
                
                  
                }
            </div>
             </Card>
          
        </Fragment>
    );

}
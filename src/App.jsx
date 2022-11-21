import logo from './logo.svg';

import React, { useState, useEffect, useCallback, Fragment, useMemo, useRef, useReducer } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import { BingoBox } from "./BingoCard/BingoBox";
import { ShortCard } from "./BingoCard/ShortCard";
import {ParticleComponent} from "./lib/ParticleComponent";

import './App.css';

const initialTodos = {
    todo: [],
    totalCount: 0
    };

const reducer = (state, action) => {
   // console.log(state, 'action', action);
    switch (action.type) {
        case "COMPLETE":
            state.todo = action.todo
            state.totalCount = action.total
            return state;
        default:
            return state;
    }
};

function App() {
    const [sortArr, setSortArr] = React.useState([]);
    const [list, setList] = React.useState([]);
    const [totalSort, setTotalSort] = React.useState(0);
    const [showParticle, setshowParticle] = React.useState(false);
    const aa = [];
    const [todos, dispatch] = useReducer(reducer, initialTodos);
    const [reset, setReset] = React.useState(0);
   const url = "./Bingo.mp3";
   const audio = new Audio(url);

   const playAudio = () => {
    audio.play();
  }

    const getValue = useCallback(
        ({ value }) => {
            console.log(value, ' console.log(value')
           // console.log(value, 'sort', todos);
            let arr = [...todos.todo]//.push(value)
            let newarr = arr.concat([value])
            let total = todos.totalCount += 1
            dispatch({ type: "COMPLETE", todo: newarr, total: total });
            setList(newarr)
            setTotalSort(total)
            if(value) {
                setshowParticle(false)
            }
        }
     )

    const getBingo =  useCallback(
        () => {
            setshowParticle(true);
            playAudio();
        }
        
    )

     const resetAll =  useCallback(
           console.log('sssss')
        

    )

     const resetGame = () => {
        setReset(reset+1)
        dispatch({ type: "COMPLETE", todo: [], total: 0 });
        setList([])
        setTotalSort(0)
        setshowParticle(false)
      
     }


    return (<div className="App" >
       
          <Card className="text-center">
                    <Card.Header>REACT BINGO APP</Card.Header>
                    <Card.Body>
                        <Button variant="primary" onClick={resetGame}>Create New Board</Button>
                    </Card.Body>
                  
                </Card>
                <br />
        <Container>
            <Row>
            { showParticle ?    <ParticleComponent />  : ''}
            </Row>
            <Row>
                <Col md={6}>
                    <BingoBox getValue={getValue} getBingo={getBingo}  reset={reset}/>
                </Col>
                <Col md={6}>
                    <ShortCard list={list}></ShortCard> 
                </Col>
            </Row>
        </Container>
   
   
        <div>
        <Button variant="dark">
      Tottal Shot <Badge bg="warning" className='totalShot'> {totalSort} </Badge>
     
    </Button>
           </div>
       </div>
    );
}

export default App;
import React, { Fragment, useState, useEffect } from "react";
import { BingoCell } from "./BingoCell";
import { createCardData } from "./BingoFun";
import Button from 'react-bootstrap/Button';

import Table from 'react-bootstrap/Table';


const random = (min, max) => {
    var range = max - min;
    if (range <= 0) {
        //alert("Paly Againg")
        return 
        //throw new Error("max must be larger than min");
    }
    var requestBytes = Math.ceil(Math.log2(range) / 8);
    if (!requestBytes) {
        // No randomness required
        return min;
    }
    var maxNum = Math.pow(256, requestBytes);
    var ar = new Uint8Array(requestBytes);

    while (true) {
        window.crypto.getRandomValues(ar);

        var val = 0;
        for (var i = 0; i < requestBytes; i++) {
            val = (val << 8) + ar[i];
        }

        if (val < maxNum - (maxNum % range)) {
            return min + (val % range);
        }
    }
};



function range(from, end) {
    const diff = end - from;
    const array = Array (diff);
    for (let i = 0; i <= diff; i++) {
        array[i] = from + i;
    }
    return array;
}


let lotteryRange = range(1, 75);

const lottery = () => {
    const idx = random(0, lotteryRange.length); //parseInt((Math.random() * lotteryRange.length).toString(), 10);
   // console.log(idx,'idx')
    const lotteryValue = lotteryRange[idx];
  //  console.log(lotteryValue, 'lotteryValue')
    lotteryRange.splice(idx, 1);
    return lotteryValue;
};

export const BingoBox = ({ getValue, getBingo, reset,
    ...props }) => {
    const [cardData, setCardData] = useState(createCardData());
    const [sortArr, setSortArr] = React.useState([]);
   // let aa = [];

   useEffect(() => {
    resetAndNewGame();
   },[reset]);

   const resetAndNewGame = () => {
    lotteryRange = range(1, 75);
    setCardData(createCardData())
   }


    const handleLottery = () => {
        const value = lottery();
      //  let arr = [...sortArr].push(value)
     //   setSortArr(arr)

      //  aa.push(value)
        getValue({ value })
     //   console.log(value, 'value', aa);
        let checked = false;
        let selectedRow = -1;
        let selectedCol = -1;
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (cardData[row][col].number === value) {
                    selectedRow = row
                    selectedCol = col
                    cardData[row][col].checked = true;
                    checked = true;
                    break;
                }
                if (checked) {
                    break;
                }
            }
        }

        setCardData(JSON.parse(JSON.stringify(cardData)));
        if (checked) {
            console.log(cardData, 'cardData', 'cardData', checked, selectedRow, selectedCol);
           checkBingoRow(selectedRow, selectedCol, cardData, checked)
          checkBingoCol(selectedRow, selectedCol, cardData, checked)
          checkLeftTorightDiagonal(selectedRow, selectedCol, cardData)
           checkRightToleftDiagonal(selectedRow, selectedCol, cardData)
        }
    
    };



    const  checkBingoRow = (row, col, cardData, checked) => {
        if (checked) {
            let is_row = true
            let selectedRow = cardData[row];
            for (let i = 0; i < selectedRow.length; i++) {
                if (!selectedRow[i].checked) {
                    is_row = false;
                    return false;
                }
            }
           // alert('BINGO')
            getBingo()
            return true
        } else {
            return false
        }
      
    }

    const checkBingoCol = (row, col, cardData, checked) => {
        let is_col = true;
        if (checked) {
            for (let i = 0; i < cardData.length; i++) {
                if (!cardData[i][col].checked) {
                    is_col = false;
                    return false;
                }
            }
            getBingo()
            return true
        } else {
            return false
        }

    }

    const checkLeftTorightDiagonal = (row, col, cardData) => {
        let is_leftright = true
        if (row === col) {
            for (let i = 0; i < 5; i++) {
                if (!cardData[i][i].checked) {
                    is_leftright = false;
                    return false;
                }
               
            }
            getBingo()
            return true
        } else {
            return false
        }
    }

    const checkRightToleftDiagonal = (row, col, cardData) => {
        let is_rightleft = true
        if (row === (5 - col - 1)) {
            for (let i = 0; i < 5; i++) {
                if (!cardData[i][5 - i - 1].checked) {
                    is_rightleft = false;
                    return false;
                }
            }
            getBingo()
            return true
        }
    }


    return (
        <Fragment>

    <Table striped bordered hover responsive="sm">
        <thead>
            <tr>
            </tr>
        </thead>
        <tbody>
            {cardData.map((row, ridx) => {
                return (
                    <tr key={ridx}>
                        {row.map((cell, cidx) => (
                             <td  key={(cidx + 1) * 99}>
                                 <BingoCell  number={cell.number} checked={cell.checked} />
                             </td>
                        ))}
                    </tr>
                )
            })} 
        </tbody>
    </Table>


    <Button size="lg" variant="primary" onClick={handleLottery}>Take A Shot</Button>
           

        

        </Fragment>
    );

}
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Game = styled.div`
  margin: 0 auto;
  margin-top:20px;
  text-align: center;
  width: 1024px;
`
const GameInfo = styled.h1`
  margin-bottom: 20px;
`
const Board = styled.div`
display: flex;
justify-content: center;
`

const SquareWrapper = styled.div`
display: flex;
flex-wrap: wrap;
width: 760px;
`
const SquareButton = styled.button`
  background-color: #fff;
  margin-top: -1px;
  margin-left: -1px;
  width:40px;
  height: 40px;
  font-size: 30px;
  border: 1px solid #000;
  cursor: pointer;
`

function Square({squares,handleAddChess}){
  const handleClick = (e) =>{
    handleAddChess(e.target.getAttribute("data-id"))
  }
  return (
    <SquareWrapper>
      {squares.map((square,index)=>
      <SquareButton data-id={index} onClick={handleClick}>
        {square === "white"&&"○"}
        {square === "black"&&"●"}
      </SquareButton>)}
    </SquareWrapper>
  )
}

function App() {
  const [squares, setSquares] = useState(Array(19*19).fill(null))
  const [round,setRound] = useState('white')
  const [winner,setWinner] = useState(null)

  const countTotal = (id,color,directionX, directionY) =>{
    let total = 0
    let tempX = Math.floor(id/19)
    let tempY = id%19
    do{
      tempX+=directionX
      tempY+=directionY
      if(squares[19*tempX+tempY]===color){
        total++
      }else{
        break
      }
    }while(id<361)
    return total
  }
  const calculateWin = (id,color)=> {
    if(countTotal(id,color,1,0)+countTotal(id,color,-1,0)>=4||
    countTotal(id,color,0,-1)+countTotal(id,color,0,1)>=4||
    countTotal(id,color,1,1)+countTotal(id,color,-1,-1)>=4||
    countTotal(id,color,1,-1)+countTotal(id,color,-1,1)>=4
    ){
      setWinner(color)
    }else{
      setWinner(null)
    }
    }
  const handleAddChess = (id) => {
    if (winner!==null||squares[id]!==null) return
    const newSquares = JSON.parse(JSON.stringify(squares))
    if(round==="white"){
      newSquares[id]="white"
      setRound('black')
      calculateWin(id,"white")
    }else{
      newSquares[id]="black"
      setRound('white')
      calculateWin(id,"black")
    }
    setSquares(newSquares)
  }
  useEffect(()=>{

  },[squares,winner])

  return (
    <Game>
      {winner!==null&&<h1>{winner} win</h1>}
      {winner===null&&<GameInfo>next player:{round}</GameInfo>}
      <Board>
        <Square squares={squares} handleAddChess={handleAddChess}/>
      </Board>
    </Game>
  );
}

export default App;

import React, { useState } from "react";
import styled from "styled-components";

const Game = styled.div`
  margin: 0 auto;
  margin-top:20px;
  justify-content: space-between;
  align-items: center;
  width: 1024px;
  display: flex;
`
const GameInfo = styled.h1`
  line-height: 1.5;
  font-size: 36px;
  text-align: center;
  flex:1;
`
const PlayerP = styled.p`
  font-weight: bold;
  color:#d2b976;
`
const Board = styled.div`
display: flex;
justify-content: center;
`

const SquareWrapper = styled.div`
background: #ecd086;
display: flex;
flex-wrap: wrap;
width: 766px;
border: 3px solid #000;
`
const SquareButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:40px;
  height: 40px;
  border: 1px solid #000;
  cursor: pointer;
`
const Piece = styled.div`
border-radius: 50%;
width: 60%;
height: 60%;
background: #000;
box-shadow: 2px 2px 4px #171717c7;
`
const WhitePiece = styled.div`
border-radius: 50%;
width: 60%;
height: 60%;
background: #fff;
box-shadow: 2px 2px 4px #e1e1e1d9;
`
function WinnerMask({winner,handleRestart}){
  return(
    <MaskWrapper>
      <WinnerInfo>{winner}   win</WinnerInfo>
      <Restart onClick={handleRestart}>重新開始~</Restart>
    </MaskWrapper>
  )
}
const MaskWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.8);
  z-index: 100;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const WinnerInfo = styled.h1`
  font-weight: bold;
  font-size: 60px;
  margin-bottom: 40px;
  white-space: pre-wrap;
`
const Restart = styled.p`
  font-size: 24px;
  cursor: pointer;
`
function Square({squares,handleAddChess}){
  const handleClick = (e) =>{
    handleAddChess(e.target.getAttribute("data-id"))
  }
  return (
    <SquareWrapper>
      {squares.map((square,index)=>
      <SquareButton data-id={index} key ={index} onClick={handleClick}>
        {square === "white"&&<WhitePiece/>}
        {square === "black"&&<Piece/>}
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
  // useEffect(()=>{

  // },[squares,winner])
  const handleRestart = ()=>{
    setSquares(Array(19*19).fill(null))
    setRound('white')
    setWinner(null)
  }

  return (
    <Game>
      {winner!==null&&
      <WinnerMask winner={winner} handleRestart={handleRestart}/>}
        <GameInfo>
          next player:
          {winner===null&&<PlayerP>{round}</PlayerP>}
        </GameInfo>
      <Board>
        <Square squares={squares} handleAddChess={handleAddChess}/>
      </Board>
    </Game>
  );
}

export default App;

import React from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';

import Die from './die';


function App() {

  function newDice(){
    const newDiceArr = []
    for(let i=0; i<10; i++){
      const diceObj = {
        value: Math.ceil(Math.random()*6),
        isHeld: false,
        id: uuid()
      }
      newDiceArr.push(diceObj)
    }
    return newDiceArr
  }
  const [dice, setDice]=React.useState(newDice)
  const [tanzies, setTanzies] = React.useState(false)
  
  React.useEffect(()=>{
    const isHeldIsTrue = dice.every(die => die.isHeld===true)
    const firstNum = dice[0].value
    const numbersAreSame = dice.every(die=> die.value===firstNum)
    if(isHeldIsTrue && numbersAreSame){
      setTanzies(true)
    }
  }, [dice])

  function heldDice(id){
    setDice(oldDice =>{
      return oldDice.map(die=> {
        if(die.id === id){
          return{
            ...die,
            isHeld: !die.isHeld
          }
        }else{
          return die
        }
      })
    })
  }
  
  const allDices = dice.map(die=> <Die key={die.id} value={die.value} isHeld={die.isHeld} heldDice={heldDice} id={die.id} />)
function rollBtn(){
  if(tanzies){
    setTanzies(false)
    setDice(newDice())
  }else{
    setDice(oldDice=>{
      return oldDice.map(dice => dice.isHeld ? dice : {...dice, value: Math.ceil(Math.random()*6)})
  })
  
}}

  
  return (
    <div className="App">
      <div className="main">
        <div className="diceSection">
            {allDices}
        </div>
        <div className="btn">
          <button className="rollBtn" onClick={rollBtn}> {tanzies? "New Game": "Roll"}</button>
        </div>
      </div>
        
    </div>
  );
}

export default App;

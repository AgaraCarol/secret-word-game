// CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react';

// Data
import {wordlist} from "./Data/Word";

// Components
import StartScreen from "./components/StartScreen";
import GameOver from './components/GameOver';
import Game from './components/Game';
const stages= [
    { id: 1 , name: "start"},
    { id: 2 , name: "game"},
    { id: 3 , name: "end"},
];


function App() {
  const [gameStage, setGameStage] =  useState(stages[0].name);
  const [words] = useState(wordlist)


  //start the secret word game
  const startGame = () => {
    setGameStage (stages[1].name)
  };

  //process the letter input 
  const verifyLetter = () => {
    setGameStage(stages[2].name);

  };

  //restarts the game 
  const retry = () => {
    setGameStage(stages[0].name);

  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame= {startGame}/>}
      {gameStage === "game" && <Game verifyLetter= {verifyLetter}/>}
      {gameStage === "end" && <GameOver retry = {retry}/>}
    </div>
  );
}

export default App;

// CSS
import './App.css';

// React
import { useState } from 'react';

// Data
import { wordList } from "./Data/Word";

// Components
import StartScreen from "./components/StartScreen";
import GameOver from './components/GameOver';
import Game from './components/Game';

const stages = [
    { id: 1, name: "start"},
    { id: 2, name: "game"},
    { id: 3, name: "end"},
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickediCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(5);
  const [score, setScore] = useState(0);

  const pickedWordAndCategory = () => {
    //pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    console.log(category);

    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);

    return { word, category };
  };

  //start the secret word game
  const startGame = () => {
    // pick word and pick category
    const { word, category } = pickedWordAndCategory();

    // create an array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // fill states
    setPickedWord(word);
    setPickediCategory(category);
    setLetters(wordLetters);

    console.log(word, category);
    
    setGameStage(stages[1].name);
  };

  //process the letter input 
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  };

  //restarts the game 
  const retry = () => {
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && (
        <Game 
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
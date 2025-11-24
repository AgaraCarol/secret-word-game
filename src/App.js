// CSS
import './App.css';

// React
import { useCallback, useState, useEffect } from 'react';

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

  const pickedWordAndCategory = useCallback (() => {
    //pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    console.log(category);

    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);

    return { word, category };
  }, [words]);

  //start the secret word game
  const startGame = useCallback (() => {

    //clear all letters
    clearLetterStates();

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
  }, [pickedWordAndCategory]);

  //process the letter input 
  const verifyLetter = (letter) => {
   const normalizedLetter = letter.toLowerCase()


   // check if letter has alredy been utilized
   if(
    guessedLetters.includes(normalizedLetter) ||
    wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    //push guessed letter or remove a guess
      if(letters.includes(normalizedLetter)) {
        setGuessedLetters((actualGuessedLetters) => [
            ...actualGuessedLetters,
            normalizedLetter
          ])
      } else{
        setWrongLetters((actualWrongLetters) => [
            ...actualWrongLetters,
            normalizedLetter
        ]);    
        setGuesses((actualGuesses) => actualGuesses - 1);

      }
  };
    const clearLetterStates = () => {
        setGuessedLetters([]);
        setWrongLetters([]);
    };

      // check if guesses ended
        useEffect(() => {
        if(guesses <= 0) {

          //reset all states
          clearLetterStates()
          setGameStage(stages[2].name);
        }
      }, [guesses]);

      //check win condition
      useEffect(() => {
       const uniqueLetter = [...new Set (letters)]

       //win condition
       if(guessedLetters.length === uniqueLetter.length)  {

        //add score
        setScore((actualScore) => actualScore + 10)

        //restart game with new word
        startGame();
       }
      }, [guessedLetters, letters , startGame])

  //restarts the game 
    const retry = () => {
    setScore(0);
    setGuesses(5);
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
      {gameStage === "end" && <GameOver retry={retry} score = {score}/>}
    </div>
  );
}

export default App;
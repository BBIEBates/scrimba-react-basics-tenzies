import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [numDiceRolls, setNumDiceRolls] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(1000);
  const [currentlyPlaying, setCurrentlyPlaying] = React.useState(true);

  React.useEffect(() => {

    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true);
        setCurrentlyPlaying(false);
        let currentNumDiceRolls = numDiceRolls;
        if (currentNumDiceRolls < bestScore) {
            setBestScore(currentNumDiceRolls);
        }
    }
  }, [dice]);
  
  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  function rollDice() {
    setNumDiceRolls(oldClicks => oldClicks + 1)
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld
          ? die
          : {
              id: die.id,
              isHeld: die.isHeld,
              value: Math.ceil(Math.random() * 6),
            };
      })
    );
  }

  function toggleIsHeld(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id
          ? { id: die.id, value: die.value, isHeld: !die.isHeld }
          : die;
      })
    );
  }

  function resetGame() {
    setTenzies(false);
    setDice(allNewDice());
    setCurrentlyPlaying(true);
    setNumDiceRolls(0);
  }

  const diceElements = dice.map((die) => {
    return (
      <Die key={die.id} die={die} toggleIsHeld={() => toggleIsHeld(die.id)} />
    );
  });

  return (
    <main className="app">
      <div className="heading">
        <h1 className="title">Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <p><b>Best score: </b><span>{bestScore === 1000 ? "roll the dice!" : bestScore + " rolls"}</span></p>
      </div>
      <div className="dice-container">{diceElements}</div>
      <div className="button-container">
        {tenzies ? "You won!!" : <button onClick={rollDice}>Roll</button>}
        {!currentlyPlaying && <button onClick={resetGame}>Reset Game</button>}
        <div>Rolls: {numDiceRolls}</div>
      </div>
      {tenzies && <Confetti />}
    </main>
  );
}

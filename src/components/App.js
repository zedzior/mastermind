import React, { useState, useEffect } from 'react';
import utils from './utils';

const Puzzle = (props) => {
  return (
    <div className='puzzle'
      onClick={() => props.onClick(props.index, props.number)}
      style={{
        backgroundColor: puzzStyle[props.status(props.index, props.number)]['back'],
        color: puzzStyle[props.status(props.index, props.number)].font,
      }}
    >
      {puzzSymbol[props.number]}
    </div>
  );
};

const Game = (props) => {
  const range = props.range;
  const [pairId, setPairId] = useState([]);
  const [pairVal, setPairVal] = useState([]);
  const [matched, setMatched] = useState([]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    //if locked, wait one second then unlock and clear pair arrays
    if (lock == true) {
      setTimeout(() => {
        setLock(false);
        setPairVal([]);
        setPairId([]);
      }, 1000);
    }
  });

  const puzzStatus = (id, val) => {
    if (pairId.includes(id)) {
      return 'open';
    }
    if (matched.includes(val)) {
      return 'matched';
    }
    return 'hidden';
  };

  const puzzClick = (id, val) => {
    //if lock == true or the same button was clicked do nothing when click
    if (lock == true || id == pairId[0]) {
      return;
    }
    //if there is 0 or 1 opened, but not matched
    const newPairId = pairId.concat(id);
    const newPairVal = pairVal.concat(val);
    if (pairId.length <= 1 && !matched.includes(val)) {
      //lock game for a while, when 2 puzzles are opened
      if (pairId.length == 1) {
        setLock(true);
        //count clicks
        const newScore = score + 1;
        setScore(newScore);
      }
      //add clicked buttons to pair arrays
      setPairId(newPairId);
      setPairVal(newPairVal);
    }
    // if there is correct match
    if (newPairVal[0] === newPairVal[1] && newPairVal.length == 2) {
      const newMatched = matched.concat(pairVal[0]);
      setMatched(newMatched);
      //clear pair arrays
      setPairId([]);
      setPairVal([]);
      //unlock game
      setLock(false);
    }
  };

  return (
    <>
      <header>
        Mastermind by Zedziorowsky for three!
      </header>
      <div className='board'>
        {range.map((number, index) =>
          <Puzzle
            key={index}
            index={index}
            number={number}
            status={puzzStatus}
            onClick={puzzClick}
          />)}
      </div>
      <div className='score'>
        Score {score}
      </div>
      <button className='newGame'
        onClick={props.newGame}>
        New Game
      </button>
    </>
  );
};

const puzzStyle = {
  matched: {
    back: 'white',
    font: 'black',
  },
  open: {
    back: 'white',
    font: 'black',
  },
  hidden: {
    back: 'grey',
    font: 'grey',
  },
};

const puzzSymbol = {
  1: 'X',
  2: 'O',
  3: '@',
  4: '%',
  5: '-',
  6: '_',
  7: '?',
  8: '|',
};

const Session = () => {
  const [gameId, setGameId] = useState(1);
  const range = utils.getRandomPairs(1, 8);
  return (
    <Game range={range} key={gameId} newGame={() => setGameId(gameId + 1)} />
  );
};

export function App() {
  return (
    <Session />
  );
}

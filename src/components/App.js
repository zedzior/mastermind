import React, { useState, useEffect } from 'react';
import utils from './utils';

const Puzzle = (props) => {
  return (
    <div className='puzzle'
      onClick={() => props.onClick(props.index, props.number)}
      style={{ backgroundColor: colors[props.status(props.index, props.number)] }}
    >
      {props.number}
    </div>
  );
};

const Game = (props) => {
  const range = props.range;
  const [pairId, setPairId] = useState([]);
  const [pairVal, setPairVal] = useState([]);
  const [matched, setMatched] = useState([]);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    //if locked, wiat one second and unlock and clear pair arrays
    if (lock == true) {
      setTimeout(() => {
        console.log('...');
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
    </>
  );
};

const colors = {
  matched: 'green',
  open: 'white',
  hidden: 'grey',
};

export function App() {
  const range = utils.getRandomPairs(1, 8);
  return (
    <Game range={range} />
  );
}

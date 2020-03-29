import React, { useState } from 'react';
import utils from './utils';

const Puzzle = (props) => {
  const [color, setColor] = useState('grey');
  const changeColor = () => setColor('white');

  return (
    <div className='puzzle'
      style={{ backgroundColor: color }}
      onClick={changeColor}
    >
      {props.id}
    </div>
  );
};

const Game = () => {
  const range = utils.getRandomPairs(1, 8);
  return (
    <>
      <header>
        Mastermind by Zedziorowsky for three!
      </header>
      <div className='board'>
        {range.map((number) => <Puzzle key={number} id={number} />)}
      </div>
    </>
  );
};


export function App() {
  return (
    <Game />
  );
}

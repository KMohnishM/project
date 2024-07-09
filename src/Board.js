import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Board.css';

import ladderImage from './ladder.jpeg'; // Adjust the path to your ladder image file

const Board = ({ gameState }) => {
  const [ladders, setLadders] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/game-state')
      .then(response => {
        setLadders(response.data.ladders || []);
      })
      .catch(error => console.error('Error fetching game state:', error));
  }, []);

  const renderLadders = () => {
    return ladders.map((ladder, index) => {
      const start = ladder[0];
      const end = ladder[1];
      const startPosition = calculatePosition(start);
      const endPosition = calculatePosition(end);
      const ladderWidth = Math.abs(startPosition.x - endPosition.x);
      const ladderHeight = Math.abs(startPosition.y - endPosition.y);
      const ladderStyle = {
        position: 'absolute',
        left: `${Math.min(startPosition.x, endPosition.x)}px`,
        top: `${Math.min(startPosition.y, endPosition.y)}px`,
        width: `${ladderWidth}px`,
        height: `${ladderHeight}px`,
        transform: startPosition.x < endPosition.x ? 'rotate(0deg)' : 'rotate(180deg)', // Adjust rotation based on start/end positions
      };
      return (
        <img key={index} src={ladderImage} alt={`Ladder ${index + 1}`} style={ladderStyle} />
      );
    });
  };

  const calculatePosition = (cellNumber) => {
    const row = Math.ceil(cellNumber / 10);
    const col = cellNumber % 10 === 0 ? 10 : cellNumber % 10;
    const x = (col - 1) * 60 + 30;
    const y = (10 - row) * 60 + 30;
    return { x, y };
  };

  const renderCells = () => {
    const cells = [];
    for (let row = 10; row > 0; row--) {
      const rowCells = [];
      const start = (row - 1) * 10 + 1;
      const end = row * 10;
      const positions = row % 2 === 0 ? [end, start, -1] : [start, end, 1];
      
      for (let i = positions[0]; i !== positions[1] + positions[2]; i += positions[2]) {
        const playersHere = gameState.players.filter(player => player.position === i);
        rowCells.push(
          <div key={i} className="cell">
            {i}
            {playersHere.map(player => (
              <div key={player.id} className={`player player-${player.id}`}>P{player.id}</div>
            ))}
          </div>
        );
      }
      cells.push(...rowCells);
    }
    return cells;
  };

  return (
    <div className="board">
      {renderCells()}
      <div className="ladders-container">
        {renderLadders()}
      </div>
    </div>
  );
};

export default Board;

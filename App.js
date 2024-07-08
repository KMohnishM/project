import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Board from './Board';

const App = () => {
  const [gameState, setGameState] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/game-state')
      .then(response => setGameState(response.data))
      .catch(error => console.error('Error fetching game state:', error));
  }, []);

  const rollDice = (playerId) => {
    const diceRoll = Math.ceil(Math.random() * 6);
    axios.post('http://127.0.0.1:5000/api/move-player', { playerId, diceRoll })
      .then(response => {
        setGameState(response.data);
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1); // Switch to the other player
      })
      .catch(error => console.error('Error moving player:', error));
  };

  if (!gameState) {
    return <div>Loading...</div>;
  }

  const winner = gameState.winner;

  return (
    <div className="App">
      <Board gameState={gameState} />
      <div className="controls">
        <button onClick={() => rollDice(currentPlayer)} disabled={!!winner}>
          Player {currentPlayer} Roll Dice
        </button>
      </div>
      {winner && (
        <div className="winner">
          <p>Player {winner} wins!</p>
        </div>
      )}
      <div>
        <p>Player 1 position: {gameState.players[0].position}</p>
        <p>Player 2 position: {gameState.players[1].position}</p>
      </div>
    </div>
  );
};

export default App;

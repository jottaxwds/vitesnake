import "./gameboard.css";
import GameOverPopUp from "../components/GameOverPopUp/GameOverPopUp";
import ScoreBoard from "../components/ScoreBoard/ScoreBoard";
import useGameboard from "../hooks/useGameboard";
import { useCallback } from "react";

const GameBoard = () => {
  const { gameState, reset } = useGameboard();

  const isSnake = useCallback(
    (col: number, row: number) =>
      gameState.snake.body.some((dot) => col === dot[0] && row === dot[1]),
    [gameState.snake.body]
  );
  const isFruit = useCallback(
    (col: number, row: number) =>
      col === gameState.fruit[0] && row === gameState.fruit[1],
    [gameState.fruit]
  );
  const isFilled = useCallback(
    (col: number, row: number) => isSnake(col, row) || isFruit(col, row),
    [isSnake, isFruit]
  );

  const getRow = useCallback(
    (rowIndex: number) =>
      [...Array(gameState.boardSize)].map((_, colIndex) => {
        const filled = isFilled(colIndex, rowIndex);
        return (
          <div
            key={`r${rowIndex}-c${colIndex}`}
            data-row={rowIndex}
            data-col={colIndex}
            className={`cell${filled ? " filled" : ""}`}
          />
        );
      }),
    [gameState.boardSize, isFilled]
  );

  return (
    <main className="main">
      <h2 className="howto">(Use arrow keys to play!)</h2>
      <h3 className="score">Your score: {gameState.score}</h3>
      <div className="container">
        {gameState.isGameOver ? (
          <GameOverPopUp onReset={reset} />
        ) : (
          <>
            <div className="game">
              <div
                className="board-wrapper"
                style={{
                  gridTemplateColumns: `repeat(${gameState.boardSize}, 1fr)`,
                  gridTemplateRows: `repeat(${gameState.boardSize}, 1fr)`,
                }}
              >
                {[...Array(gameState.boardSize)].map((_, index) =>
                  getRow(index)
                )}
              </div>
            </div>
            <ScoreBoard scores={gameState.scores} />
          </>
        )}
      </div>
    </main>
  );
};

export default GameBoard;

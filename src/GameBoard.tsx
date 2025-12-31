import React from 'react';
import updateSnakeBoard, { defaultGameState, resetGameState } from './engine';
import useInterval from './hooks/useInterval';
import useArrowKeys from './hooks/useArrowKeys';
import './styles.css';
import { type GameState } from './engine/types';
import GameOverPopUp from './components/GameOverPopUp/GameOverPopUp';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';

const GameBoard = () => {
    const { arrowDirection } = useArrowKeys();
    const [gameState, setGameState] = React.useState<GameState>(defaultGameState);

    useInterval(() => {
        if (gameState.isGameOver) {
            return;
        }
        const newGameState = updateSnakeBoard(gameState, arrowDirection || gameState.snake.direction);
        setGameState(newGameState);
    }, 60);

    const reset = () => {
        setGameState(resetGameState(gameState));
    }

    const isSnake = (col: number, row: number) => gameState.snake.body.some((dot) => col === dot[0] && row === dot[1]);
    const isFruit = (col: number, row: number) => col === gameState.fruit[0] && row === gameState.fruit[1];
    const isFilled = (col: number, row: number) => isSnake(col, row) || isFruit(col, row);

    const getRow = (rowIndex: number) => ([...Array(gameState.boardSize)].map((_, colIndex) => {
        // add 'filled' class when filled
        const filled = isFilled(colIndex, rowIndex);
        return <div key={`r${rowIndex}-c${colIndex}`} data-row={rowIndex} data-col={colIndex} className={`cell${filled ? ' filled' : ''}`} />;
    }));

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
                                    gridTemplateRows: `repeat(${gameState.boardSize}, 1fr)`
                                }}
                            >
                                {[...Array(gameState.boardSize)].map((_, index) => getRow(index))}
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
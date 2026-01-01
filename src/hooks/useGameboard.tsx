import { useEffect, useRef, useState } from "react";
import type { GameState } from "../engine/types";
import useArrowKeys from "./useArrowKeys";
import updateSnakeBoard, { defaultGameState, resetGameState } from "../engine";

const useGameboard = () => {
  const { arrowDirection } = useArrowKeys();
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const lastUpdateRef = useRef(performance.now());
  const gameStateRef = useRef(gameState);
  const arrowDirRef = useRef(arrowDirection);

  const reset = () => {
    setGameState(resetGameState(gameState));
  };
  
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    arrowDirRef.current = arrowDirection;
  }, [arrowDirection]);

  useEffect(() => {
    if (gameStateRef.current.isGameOver) {
      return () => cancelAnimationFrame(animationFrameId);
    }
    let animationFrameId: number;

    const loop = (now: number) => {
      if (gameStateRef.current.isGameOver) return;
      if (now - lastUpdateRef.current >= gameStateRef.current.gameSpeed) {
        const nextState = updateSnakeBoard(
          gameStateRef.current,
          arrowDirRef.current || gameStateRef.current.snake.direction
        );
        setGameState(nextState);
        lastUpdateRef.current = now;
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [gameStateRef.current.isGameOver]);

  return { gameState, arrowDirection, reset }
}

export default useGameboard;
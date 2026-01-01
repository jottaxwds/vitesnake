export enum Direction {
    UP = 'ArrowUp',
    RIGHT = 'ArrowRight',
    DOWN = 'ArrowDown',
    LEFT = 'ArrowLeft',
}

export type BodyDot = [number, number];

export interface Snake {
    body: BodyDot[];
    direction: Direction;
}

export interface GetNewSnakeHeadArgs {
    prevHead: BodyDot;
    boardSize: number;
}

export type NewSnakeHeadLookUp = Record<Direction, BodyDot>;

export type GameState = {
    isGameOver: boolean;
    scores: number[],
    score: number,
    snake: Snake;
    boardSize: number;
    fruit: BodyDot;
    gameSpeed: number;
}
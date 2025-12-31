import { type GetNewSnakeHeadArgs, type NewSnakeHeadLookUp, Direction, type BodyDot, type Snake, type GameState } from "./types";

const DEFAULT_BOARD_SIZE = 20;

const snakeDefault = {
    body: [
      [0,0],
      [0,1],
      [0,2],
      [0,3],
      [0,4],
      [0,5],
      [0,6],
      [0,7],
      [0,8],
      [0,9],
      [0,10],
      [0,11],
      [0,12],
      [0,13],
      [0,14],
      [0,15],
      [0,16],
      [0,17],
      [0,18],
    ],
    direction: Direction.RIGHT,
} as Snake;

const backwardsLookup = {
    [Direction.UP]: Direction.DOWN,
    [Direction.DOWN]: Direction.UP,
    [Direction.LEFT]: Direction.RIGHT,
    [Direction.RIGHT]: Direction.LEFT,
}

export const isGoingBackwards = (prevDirection: Direction, newDirection: Direction) => backwardsLookup[prevDirection] === newDirection;

export const generateNewFruit = (boardSize: number): BodyDot => [Math.floor(Math.random() * (boardSize - 1)), Math.floor(Math.random() * (boardSize - 1))];

export const defaultGameState = {
    isGameOver: false,
    scores: [],
    score: 0,
    inputDirection: Direction.RIGHT,
    boardSize: DEFAULT_BOARD_SIZE,
    snake: {...snakeDefault},
    fruit: generateNewFruit(DEFAULT_BOARD_SIZE),
}

const newSnakeHeadLookUp = ({prevHead, boardSize }: GetNewSnakeHeadArgs): NewSnakeHeadLookUp => ({
   [Direction.UP]: prevHead[1] === 0 ? [prevHead[0], boardSize - 1] : [prevHead[0], prevHead[1] - 1],
   [Direction.DOWN]: prevHead[1] === boardSize - 1 ? [prevHead[0], 0] : [prevHead[0], prevHead[1] + 1],
   [Direction.LEFT]: prevHead[0] === 0 ? [boardSize - 1, prevHead[1]] : [prevHead[0] - 1, prevHead[1]],
   [Direction.RIGHT]: prevHead[0] === boardSize - 1 ? [0, prevHead[1]] : [prevHead[0] + 1, prevHead[1]],
});

const moveSnakeBody = (body: BodyDot[], newHead: BodyDot, eatsFruit: boolean): BodyDot[] => {
    const newBody = [...body];
    newBody.pop();
    return eatsFruit ? [newHead, newHead, ...newBody] : [newHead, ...newBody];
}

export const isGameOver = (snakeBody: BodyDot[]) => {
    const [ head, , ...body] = snakeBody;
    return body.some(([x, y]) => head[0] === x && head[1] === y);
}

const getNewDirection = (arrowDirection: Direction, snakeDirection: Direction): Direction => {
    if(arrowDirection === snakeDirection || arrowDirection === undefined || isGoingBackwards(snakeDirection, arrowDirection)) {
        return snakeDirection;
    }
    return arrowDirection;
}

const updateSnakeBoard = (gameState: GameState, arrowDirection: Direction): GameState => {
    const { snake, fruit, boardSize } = gameState;
    const inputDirection = getNewDirection(arrowDirection, snake.direction);
    const newHead = newSnakeHeadLookUp({ prevHead: snake.body[0], boardSize })[inputDirection];
    const eatsFruit = newHead[0] === fruit[0] && newHead[1] === fruit[1];
    const newBody = moveSnakeBody(snake.body, newHead, eatsFruit);
    const newSnake = { ...snake, body: newBody, direction: inputDirection };
    return {
        ...gameState,
        isGameOver: isGameOver(newSnake.body),
        snake: newSnake,
        fruit: (eatsFruit) ? generateNewFruit(boardSize) : fruit,
        score: snake.body.length !== newSnake.body.length ? gameState.score + 1 : gameState.score
    }
}

export const resetGameState = (prevGameState: GameState): GameState => {
    const { scores: newScores, score } = prevGameState;
    newScores.push(score);
    return ({
        ...defaultGameState,
        scores: newScores,
    });
}

export default updateSnakeBoard;
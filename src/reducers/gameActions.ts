
import { GameActionKind, GameAction} from "../types/gameReducerTypes"; 


export const startGame = () => {
  return { type: GameActionKind.START_GAME }
}
export const endGame = () => {
  return { type: GameActionKind.END_GAME }
}
export const resetGame = () => {
  return { type: GameActionKind.RESET_GAME }
}
export const addScore = (score: number): GameAction => {
  return { type: GameActionKind.INCREMENT_SCORE, payload: { score } }
}
export const addGuess = (guesses: number): GameAction => {
  return { type: GameActionKind.ADD_GUESS, payload: { guesses } }
}

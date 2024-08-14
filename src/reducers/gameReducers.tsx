//TODO Stworzyc faktyczny reducer do grida

import {
  GameAction,
  GameStateType,
  GameActionKind,
} from "../types/gameReducerTypes";

export const initialGameState: GameStateType = {
  gameState: "preStart",
  score: 0,
  guesses: 0,
};

export function gameReducer(state: GameStateType, action: GameAction) {
  switch (action.type) {
    case GameActionKind.START_GAME: {
      return { ...state, gameState: "During" };
    }
    case GameActionKind.END_GAME: {
      return { ...state, gamState: "End" };
    }
    case GameActionKind.RESET_GAME: {
      return { ...state, gameState: "preStart", score: 0 };
    }
    case GameActionKind.ADD_SCORE: {
      return { ...state, score: state.score + action.payload.score };
    }
    case GameActionKind.ADD_GUESS: {
      return { ...state, guesses: state.guesses + action.payload.guesses };
    }
    default: {
      throw Error("Wrong or no action chosen in gameReducer!");
    }
  }
}

/*
  Miec tutaj trzy stany gry.
  
  PreStart
  During
  End

  Zmieniac te stany w zaleznosci od tego co sie dzieje
  I przy zmianie stanu triggerowac rzeczy: np modale, ui elementy, theme, animacje, w/e
*/

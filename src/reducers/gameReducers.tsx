//TODO Stworzyc faktyczny reducer do grida

import {
  GameAction,
  CardsComparisonAndNamesArr,
  GameActionKind,
} from "../types/gameReducerTypes";

export const initalCardsComparisonState = [];

export function gameReducer(
  state: CardsComparisonAndNamesArr,
  action: GameAction
) {
  switch (action.type) {
    case GameActionKind.ADD: {
      return [action.payload, ...state];
    }
    case GameActionKind.RESET: {
      return [];
    }
    default: {
      throw Error("Wrong or no action chosen in gameReducer!");
    }
  }
}

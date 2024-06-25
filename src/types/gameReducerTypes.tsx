import { CardsComparisonAndNames } from "./utils";

export enum GameActionKind {
  ADD = "ADD",
  RESET = "RESET",
}

export interface GameAction {
  type: GameActionKind;
  payload: CardsComparisonAndNames;
}

export type CardsComparisonAndNamesArr = CardsComparisonAndNames[];

import { Dispatch, createContext, useContext, useReducer } from "react";
import {
  CardsComparisonAndNamesArr,
  GameAction,
} from "../types/gameReducerTypes";
import {
  gameReducer,
  initalCardsComparisonState,
} from "../reducers/gameReducers";

type CardsComparisonContextType = {
  cardsComparisonOutcomeArr: CardsComparisonAndNamesArr;
  dispatch: Dispatch<GameAction>;
};

const CardsComparisonContext = createContext<CardsComparisonContextType | null>(
  null
);

export const CardsComparisonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cardsComparisonOutcomeArr, dispatch] = useReducer(
    gameReducer,
    initalCardsComparisonState
  );

  return (
    <CardsComparisonContext.Provider
      value={{ cardsComparisonOutcomeArr, dispatch }}
    >
      {children}
    </CardsComparisonContext.Provider>
  );
};

export const useCardsComparisonContext = () => {
  const ctx = useContext(CardsComparisonContext);

  if (!ctx) {
    throw Error(
      "Missing CardsComparisonContext, it's not wrapped in the provider"
    );
  }

  return ctx;
};

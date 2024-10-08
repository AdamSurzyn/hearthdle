import Search from "../components/ui/search/search";
import Grid from "../components/ui/grid";
import "../pages/game.scss";
import { CardCommonAttributes, CardsQueryData } from "../types/searchTypes";
import { useQuery } from "react-query";
import { getAllCards } from "../api/getCards";
import {
  compareCardAttributes,
  pickRandomCard,
  replaceIdWithName,
} from "../utils/utils";
import {
  startGame,
  endGame,
  addGuess,
  addScore,
  resetGame,
} from "../reducers/gameActions";
import { useChosenCardContext } from "../contexts/CardsContext";
import { useGameContext } from "../contexts/GameStateContext";
import { useEffect, useReducer, useState } from "react";
import { gameReducer, initialGameState } from "../reducers/gameReducers";
import { GameState } from "../types/gameReducerTypes";
import { ReplayModal } from "../components/ui/replayModal/replayModal";

const Game = () => {
  const currentChosenCard = useChosenCardContext();
  const { userGuessArr, addToUserGuessArr, clearUserGuessArr } =
    useGameContext();
  const { error, data, isLoading } = useQuery<CardsQueryData, Error>({
    queryKey: ["cardsQuery"],
    queryFn: getAllCards,
  });
  const dispatchResetGame = () => {
    gameDispatch(resetGame());
  };
  const [currentGameState, gameDispatch] = useReducer(
    gameReducer,
    initialGameState
  );

  const [randomCard, setRandomCard] = useState<CardCommonAttributes | null>(
    null
  );
  useEffect(() => {
    if (!data || currentGameState.gameState !== GameState.Idle) {
      return;
    }
    const randomCard = pickRandomCard(data.cards);
    setRandomCard(randomCard);
    gameDispatch(startGame());
  }, [data, currentGameState]);

  useEffect(() => {
    if (!currentChosenCard.choosenCard || !randomCard) return;

    const newRandomCard = replaceIdWithName(randomCard);
    const newChosenCard = replaceIdWithName(currentChosenCard.choosenCard);
    gameDispatch(addGuess(1));
    const cardsComparisonOutcome = compareCardAttributes(
      newRandomCard,
      newChosenCard
    );
    if (cardsComparisonOutcome?.cardNameCorrect) {
      clearUserGuessArr();
      gameDispatch(addScore(1));
      gameDispatch(endGame());
    } else if (cardsComparisonOutcome) {
      addToUserGuessArr(cardsComparisonOutcome);
    }
  }, [currentChosenCard, data]);

  if (error) {
    return <div>An error occured : {error.message}</div>;
  }
  return (
    <div className="container">
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      ) : (
        <Search gameState={currentGameState} />
      )}
      <Grid cardsComparisonArr={userGuessArr} />

      {currentGameState.gameState === GameState.End && (
        <ReplayModal
          onReset={dispatchResetGame}
          gameState={currentGameState}
        ></ReplayModal>
      )}
    </div>
  );
};

export default Game;

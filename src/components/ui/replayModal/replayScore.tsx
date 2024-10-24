import React from "react";
import { calculatePercentOfWins } from "../../../utils/utils";
import { GameScoreType } from "../../../types/modalTypes";
import "./replayScore.scss";
export const ReplayScore = ({ gameState }: GameScoreType) => {
  const percentOfWins = calculatePercentOfWins(
    gameState.score,
    gameState.totalGuesses
  );

  return (
    <div className="game-score-container">
      <table className="game-score-table">
        <tbody>
          <tr>
            <td>Tries this round:</td>
            <td>{gameState.guesses}</td>
          </tr>
          <tr>
            <td>Total guessed cards:</td>
            <td>{gameState.score}</td>
          </tr>
          <tr>
            <td>Correctness ratio:</td>
            <td>{percentOfWins}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

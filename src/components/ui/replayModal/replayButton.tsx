import React from "react";
import "./modalButton.scss";
import { ReplayButtonProps } from "../../../types/modalTypes";

export const ReplayButton = ({ onReset }: ReplayButtonProps) => {
  return (
    <div className="replay-button-container">
      <button className="replay-button" onClick={onReset}>
        <span>Replay?</span>
      </button>
    </div>
  );
};

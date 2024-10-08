import React from "react";
import "./modalButton.scss";
import { ReplayButtonProps } from "../../../types/modalTypes";
// Define the props type for the component

// Create the functional component with props type
export const ReplayButton: React.FC<ReplayButtonProps> = ({ onReset }) => {
  // Handle button click to toggle the replay state
  return (
    <div className="replay-button-container">
      <button className="modal-button" onClick={onReset}>
        <span>Replay</span>
      </button>
    </div>
  );
};

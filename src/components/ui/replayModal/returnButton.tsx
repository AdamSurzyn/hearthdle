import React from "react";
import { Link } from "react-router-dom";
import "./modalButton.scss";
export const ReturnButton = () => {
  return (
    <Link to="/" className="return-button-container">
      <button className="modal-button">
        <span>Return</span>
      </button>
    </Link>
  );
};

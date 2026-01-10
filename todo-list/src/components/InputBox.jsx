import "./InputBox.css";
import { useState } from "react";

export function InputBox() {
  return (
    <>
      <div className="input-container">
        <input
          type="text"
          className="text-input"
          placeholder="Enter a new todo item..."
        />
        <button className="add-button">Add</button>
      </div>
    </>
  );
}

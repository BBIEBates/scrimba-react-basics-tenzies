import React from "react";

export default function Die({ die, toggleIsHeld }) {
  return (
    <div className={`die-face ${die.isHeld && "green"}`} onClick={toggleIsHeld}>
      {die.value}
    </div>
  );
}

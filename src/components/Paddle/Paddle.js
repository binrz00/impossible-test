import React from "react";
import "./Paddle.css";

export default function Paddle({ movement }) {
  return (
    <div
      className="paddle"
      style={{ top: `${movement.y}px`, transform: `rotate(${movement.r}deg)` }}
    />
  );
}

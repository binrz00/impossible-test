import React from "react";
import "./Paddle.css";

export default function Paddle({ paddleY }) {
  return <div className="paddle" style={{ top: `${paddleY}px` }} />;
}

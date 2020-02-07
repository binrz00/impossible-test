import React from "react";
import "./Score.css";

export default function Score(props) {
  return (
    <div className="score" style={{}}>
      Score: {props.score}
    </div>
  );
}

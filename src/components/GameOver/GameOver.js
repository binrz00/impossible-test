import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GameOver.css";

export default function GameOver(props) {
  const [typing, setTyping] = useState(true);
  const [HighScores, setHighScores] = useState([]);
  function postScore(name) {
    axios
      .post("http://localhost:5000/api/v1/high-scores", {
        name,
        score: props.score
      })
      .then(res => {
        console.log(res);
      });
    setTyping(false);
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/high-scores").then(res => {
      res.data.highScores.sort((a, b) => (a.score < b.score ? 1 : -1));

      if (res.data.highScores.length > 10) {
        res.data.highScores.pop(res.data.highScores.length - 11);
      }
      setHighScores(res.data.highScores);
    });
  }, [HighScores]);

  return (
    <>
      {typing && (
        <div>
          <h1>congratulations your score was {props.score}</h1>
          <p>what name would you like to display?</p>
          <input id="name" />
          <button
            onClick={() => {
              const user = document.getElementById("name");
              postScore(user.value);
            }}
          >
            submit
          </button>
        </div>
      )}
      {!typing && (
        <div>
          <h1>High Scores</h1>
          <ol>
            {HighScores.map(({ name, score }) => (
              <li>
                {name}: {score}
              </li>
            ))}
          </ol>
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            try again
          </button>
        </div>
      )}
    </>
  );
}

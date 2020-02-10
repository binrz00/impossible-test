import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "grommet";
import "./GameOver.css";
import { navajowhite } from "color-name";

export default function GameOver(props) {
  const [typing, setTyping] = useState(true);
  const [HighScores, setHighScores] = useState([]);
  function postScore(name) {
    console.log("works");
    axios
      .post(process.env.REACT_APP_URL + "/api/v1/high-scores", {
        name,
        score: props.score
      })
      .then(res => {
        console.log(res);
      });
    setTyping(false);
  }
  function newGame() {
    window.location.reload();
  }

  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "/api/v1/high-scores").then(res => {
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
          <Button
            label="Submit"
            onClick={() => {
              const user = document.getElementById("name");
              postScore(user.value);
            }}
          />
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
          <Button label="back to dash" onClick={newGame} />
        </div>
      )}
    </>
  );
}

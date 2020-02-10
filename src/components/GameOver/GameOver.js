import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GameOver.css";

export default function GameOver(props) {
  const [typing, setTyping] = useState(true);
  const [HighScores, setHighScores] = useState([]);
  function postScore(initials) {
    axios
      .post("http://localhost:5000/api/v1/high-scores", {
        initials,
        score: props.score
      })
      .then(res => {
        console.log(res);
      });
    setTyping(false);
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/high-scores").then(res => {
      // let tops = [];
      // res.data.highScores.map(score => {
      //   tops.push(score.score);
      //   return tops;
      // });
      // console.log(tops);
      // console.log(tops.sort());
      setHighScores(res.data.highScores);
    });
  }, []);

  return (
    <>
      {typing && (
        <div>
          <h1>congratulations your score was {props.score}</h1>
          <p>what are your initials?</p>
          <input id="initials" />
          <button
            onClick={() => {
              const user = document.getElementById("initials");
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
            {HighScores.map(({ initials, score }) => (
              <li>
                {initials}: {score}
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}

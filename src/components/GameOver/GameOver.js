import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "grommet";
import { AuthContext } from "../../auth/auth";
import "./GameOver.css";

export default function GameOver(props) {
  const { user } = useContext(AuthContext);
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
    props.dispatch({
      type: "NEW_GAME",
      payload: {}
    });
  }

  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "/api/v1/high-scores").then(res => {
      const sorted = res.data.highScores.sort((a, b) =>
        a.score < b.score ? 1 : -1
      );
      const topTen = sorted.slice(0, 10);
      setHighScores(topTen);
      if (topTen[topTen.length - 1].score > props.score && topTen.length > 9) {
        setTyping(false);
      }
    });
  }, [HighScores, props.score]);

  return (
    <>
      {typing && (
        <div>
          <h1>
            congratulations {user.name.split(" ")[0]}! your score was{" "}
            {props.score}
          </h1>
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
          <Button label="Try Again" onClick={newGame} />
        </div>
      )}
    </>
  );
}

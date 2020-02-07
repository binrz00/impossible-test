import React, { useReducer, useEffect } from "react";
import "./styles.css";
import Paddle from "./components/Paddle";
import { level_one } from "./levels";
import Obstacle from "./components/Obstacle";
import willCollide from "./utils/willCollide";
import GameProvider from "./state/context";
import showObstacles from "./utils/showObstacles";
import Score from "./components/Score";
import reducer from "./state/reducer";
const obstacles = level_one.reduce((acc, cur, y) => {
  const blocks = cur.split("").reduce((bs, b, x) => {
    if (b === " ") {
      return [...bs];
    }
    return [
      ...bs,
      {
        type: b,
        dx: -1,
        x: x * 30,
        y: y * 30,
        width: 30,
        height: 30
      }
    ];
  }, []);
  return [...acc, ...blocks];
}, []);
const displayBlocks = [];
const initialState = {
  player: {
    y: 200,
    dy: 5,
    x: 60,
    dx: 0,
    landed: false,
    r: 0,
    falling: true,
    jumping: false,
    alive: true,
    width: 30,
    height: 30
  },
  obstacles,
  displayBlocks,
  score: 0
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  function handleKeyDown(e) {
    if (
      e.keyCode === 32 &&
      state.player.dy === 0 &&
      state.player.jumping === false
    ) {
      const jump = setTimeout(() => {
        dispatch({
          type: "MOVE_PLAYER",
          payload: {
            falling: true,
            jumping: false
          }
        });
      }, 500);

      dispatch({
        type: "MOVE_PLAYER",
        payload: {
          dy: -5,
          r: 90,
          falling: false,
          landed: false,
          jumping: true
        }
      });
      return () => clearTimeout(jump);
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state]);

  useEffect(() => {
    if (state.playing === false) {
      return;
    }
    if (state.player.alive === false) {
      return dispatch({
        type: "GAMEOVER",
        payload: {}
      });
    }

    const handle = setTimeout(() => {
      const player = {
        ...state.player,
        height: 30,
        width: 30
      };
      showObstacles(obstacles, displayBlocks, dispatch);
      //const collisions = [...state.obstacles].map(ob => {
      displayBlocks.map(ob => {
        return willCollide(state.player, ob, state.alive, dispatch);
      });

      dispatch({
        type: "UPDATE_SCORE",
        payload: {
          score: (state.score += 1)
        }
      });

      if (state.player.landed === true) {
        player.dy = 0;
        player.landed = false;
      }
      if (state.player.falling === true) {
        player.dy = 5;
      }
      // bottom limit
      if (state.player.y + 5 + player.height > 300) {
        player.falling = false;
        player.jumping = false;
        player.landed = true;
        player.dy = 0;
      } else if (state.player.y + state.player.dy < 0) {
        //top limit
        player.y = 0;
      } else {
        player.y = player.y + player.dy;
      }

      dispatch({
        type: "RENDER",
        payload: {
          player
        }
      });
    }, 25);
    return () => clearTimeout(handle);
  }, [state]);

  return (
    <GameProvider>
      <Score score={state.score} />
      <div className="container">
        {displayBlocks.map(({ type, ...style }) => (
          <Obstacle type={type} style={style} />
        ))}
        <Paddle movement={state.player} />
      </div>
    </GameProvider>
  );
}

import React, { useReducer, useEffect } from "react";
import "./styles.css";
import Paddle from "./components/Paddle";
import { level_one } from "./levels";
import Obstacle from "./components/Obstacle";
import willCollide from "./utils/willCollide";
import GameProvider from "./state/context";
import showObstacles from "./utils/showObstacles";
import Score from "./components/Score";
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
    jumping: false
  },
  obstacles,
  displayBlocks,
  score: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "MOVE_PLAYER":
      return {
        ...state,
        player: {
          ...state.player,
          ...action.payload
        }
      };
    case "RENDER":
      return {
        ...state,
        player: { ...state.player, ...action.payload.player }
      };
    default:
      throw new Error("Event not found: ", action.type);
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state.player.falling);
  // console.log(state.player.jumping);
  function handleKeyDown(e) {
    if (
      e.keyCode === 32 &&
      // state.player.falling === false &&
      // state.player.dy !== -5 &&
      state.player.dy === 0 &&
      state.player.jumping === false
    ) {
      // console.log("hello");
      const jump = setTimeout(() => {
        dispatch({
          type: "MOVE_PLAYER",
          payload: {
            // dy: 5,
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
  // function handleKeyUp(e) {
  //   if (e.keyCode === 32 && state.player.landed === false) {
  //     dispatch({
  //       type: "MOVE_PLAYER",
  //       payload: {
  //         r: 90,
  //         //landed: false,
  //         dy: 5
  //       }
  //     });
  //   }
  // }
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state]);
  // useEffect(() => {
  //   window.addEventListener("keyup", handleKeyUp);
  //   return () => window.removeEventListener("keyup", handleKeyUp);
  // }, [state]);

  useEffect(() => {
    const handle = setTimeout(() => {
      let y = state.player.y;
      let dy = state.player.dy;
      let x = state.player.x;
      let dx = state.player.dx;
      let landed = state.player.landed;
      let r = state.player.r;
      let falling = state.player.falling;
      let jumping = state.player.jumping;
      const player = {
        y,
        dy,
        x,
        dx,
        landed,
        r,
        falling,
        jumping,
        height: 30,
        width: 30
      };
      showObstacles(obstacles, displayBlocks);
      //const collisions = [...state.obstacles].map(ob => {
      displayBlocks.map(ob => {
        // ob.x = ob.x - 1;
        return willCollide(player, ob);
      });
      state.score += 1;
      // if (collisions.some(c => c.x)) {
      //   dx = -dx;
      // }
      // console.log(player.falling);
      if (player.landed === true) {
        dy = 0;
        player.landed = false;
        // player.falling = false;
      }
      if (player.falling === true) {
        dy = 5;
      }
      // bottom limit
      if (player.y + 5 + player.height > 300) {
        player.falling = false;
        player.jumping = false;
        player.landed = true;
        //y = 275;
        dy = 0;
        // landed = false;
      } else if (y + state.player.dy < 0) {
        //top limit
        y = 0;
      } else {
        y = y + dy;
      }
      dispatch({
        type: "RENDER",
        payload: {
          player: {
            y: y,
            dy: dy
          }
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

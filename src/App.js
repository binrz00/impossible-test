import React, { useReducer, useEffect } from "react";
import "./styles.css";
import Paddle from "./components/Paddle";
import { level_one } from "./levels";
import Obstacle from "./components/Obstacle";
import willCollide from "./utils/willCollide";
import GameProvider from "./state/context";
import showObstacles from "./utils/showObstacles";
const obstacles = level_one.reduce((acc, cur, y) => {
  const blocks = cur.split("").reduce((bs, b, x) => {
    if (b === " ") {
      return [...bs];
    }
    return [
      ...bs,
      {
        type: b,
        x: x * 10,
        y: y * 10,
        width: 30,
        height: 30
      }
    ];
  }, []);
  return [...acc, ...blocks];
}, []);
console.log(obstacles);
const initialState = {
  player: {
    y: 200,
    dy: 0,
    x: 60,
    dx: 0,
    landed: false
  },
  obstacles
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

  function handleKeyDown(e) {
    if (e.keyCode === 32 && state.player.dy === 0) {
      const jump = setTimeout(() => {
        dispatch({
          type: "MOVE_PLAYER",
          payload: {
            landed: false,
            dy: 5
          }
        });
      }, 500);

      dispatch({
        type: "MOVE_PLAYER",
        payload: {
          //landed: false,
          dy: -5
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
    const handle = setTimeout(() => {
      let y = state.player.y;
      let dy = state.player.dy;
      let x = state.player.x;
      let dx = state.player.dx;
      let landed = state.player.landed;

      const player = {
        y,
        dy,
        x,
        dx,
        landed,
        height: 30,
        width: 30
      };
      showObstacles(obstacles);
      const collisions = [...state.obstacles].map(ob => {
        ob.x = ob.x - 1;
        return willCollide(player, ob);
      });

      // if (collisions.some(c => c.x)) {
      //   dx = -dx;
      // }
      if (player.landed === true) {
        dy = 0;
        landed = false;
      }
      // bottom limit
      if (player.y + player.dy + player.height > 300) {
        //y = 275;
        dy = 0;
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
  }, [state.player.y, state.player.dy, state.scroll]);

  return (
    <GameProvider>
      <div className="container">
        {state.obstacles.map(({ type, ...style }) => (
          <Obstacle type={type} style={style} />
        ))}
        <Paddle paddleY={state.player.y} />
      </div>
    </GameProvider>
  );
}

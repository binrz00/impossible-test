import React, { useReducer, useEffect } from "react";
import "./styles.css";
import Paddle from "./components/Paddle";
import { level_one } from "./levels";
import Obstacle from "./components/Obstacle";
import willCollide from "./utils/willCollide";
import GameProvider from "./state/context";

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
        width: 10,
        height: 10
      }
    ];
  }, []);
  return [...acc, ...blocks];
}, []);

const initialState = {
  paddle1: {
    y: 200,
    dy: 10,
    x: 60,
    dx: 0,
    landed: false
  },
  obstacles
};

function reducer(state, action) {
  switch (action.type) {
    case "MOVE_PADDLE_1":
      return {
        ...state,
        paddle1: {
          ...state.paddle1,
          ...action.payload
        }
      };
    case "RENDER":
      return {
        ...state,
        paddle1: { ...state.paddle1, ...action.payload.paddle1 }
      };
    default:
      throw new Error("Event not found: ", action.type);
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleKeyDown(e) {
    if (e.keyCode === 32 && state.paddle1.dy !== -10) {
      dispatch({
        type: "MOVE_PADDLE_1",
        payload: {
          landed: false,
          dy: -10
        }
      });
    }
  }
  function handleKeyUp(e) {
    if (e.keyCode === 32 && state.paddle1.dy !== 10) {
      dispatch({
        type: "MOVE_PADDLE_1",
        payload: {
          dy: 10
        }
      });
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state]);
  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [state]);

  useEffect(() => {
    const handle = setTimeout(() => {
      let y = state.paddle1.y;
      let dy = state.paddle1.dy;
      let x = state.paddle1.x;
      let dx = state.paddle1.dx;
      let landed = state.paddle1.landed;

      const paddle1 = {
        y,
        dy,
        x,
        dx,
        landed,
        height: 30,
        width: 30
      };

      const collisions = [...state.obstacles].map(ob => {
        return willCollide(paddle1, ob);
      });

      // if (collisions.some(c => c.x)) {
      //   dx = -dx;
      // }
      if (paddle1.landed === true) {
        dy = 0;
        landed = false;
      }
      // bottom limit
      if (y + state.paddle1.dy > 300 - 25) {
        y = 275;
      } else if (y + state.paddle1.dy < 0) {
        //top limit
        y = 0;
      } else {
        y = y + dy;
      }

      dispatch({
        type: "RENDER",
        payload: {
          paddle1: {
            y: y,
            dy: dy
          }
        }
      });
    }, 50);
    return () => clearTimeout(handle);
  }, [state.paddle1.y, state.paddle1.dy]);

  return (
    <GameProvider>
      <div className="container">
        {state.obstacles.map(({ type, ...style }) => (
          <Obstacle type={type} style={style} />
        ))}
        <Paddle paddleY={state.paddle1.y} />
      </div>
    </GameProvider>
  );
}

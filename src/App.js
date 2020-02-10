// import React, { useReducer, useEffect } from "react";
// import "./styles.css";
// import Paddle from "./components/Paddle";
// import { level_one } from "./levels";
// import Obstacle from "./components/Obstacle";
// import willCollide from "./utils/willCollide";
// import Score from "./components/Score";
// import reducer from "./state/reducer";
// import GameOver from "./components/GameOver";
// const obstacles = level_one.reduce((acc, cur, y) => {
//   const blocks = cur.split("").reduce((bs, b, x) => {
//     if (b === " ") {
//       return [...bs];
//     }
//     return [
//       ...bs,
//       {
//         type: b,
//         dx: -1,
//         x: x * 30,
//         y: y * 30,
//         width: 30,
//         height: 30
//       }
//     ];
//   }, []);
//   return [...acc, ...blocks];
// }, []);
// const displayBlocks = [];
// const initialState = {
//   playing: true,
//   player: {
//     y: 200,
//     dy: 5,
//     x: 60,
//     dx: 0,
//     landed: false,
//     r: 0,
//     falling: true,
//     jumping: false,
//     alive: true,
//     width: 30,
//     height: 30
//   },
//   obstacles,
//   displayBlocks,
//   score: 0
// };

// export default function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   function handleKeyDown(e) {
//     if (
//       e.keyCode === 32 &&
//       state.player.dy === 0 &&
//       state.player.jumping === false
//     ) {
//       const jump = setTimeout(() => {
//         dispatch({
//           type: "MOVE_PLAYER",
//           payload: {
//             falling: true,
//             jumping: false
//           }
//         });
//       }, 500);

//       dispatch({
//         type: "MOVE_PLAYER",
//         payload: {
//           dy: -5,
//           r: 90,
//           falling: false,
//           landed: false,
//           jumping: true
//         }
//       });
//       return () => clearTimeout(jump);
//     }
//   }
//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [state]);

//   useEffect(() => {
//     if (state.playing === false) {
//       return;
//     }
//     if (state.player.alive === false) {
//       return dispatch({
//         type: "GAMEOVER",
//         payload: {}
//       });
//     }

//     const handle = setTimeout(() => {
//       const player = {
//         ...state.player,
//         height: 30,
//         width: 30
//       };
//       //showObstacles(obstacles, displayBlocks, dispatch);
//       //const collisions = [...state.obstacles].map(ob => {
//       state.obstacles.map(ob => {
//         ob.x += -4;
//         return willCollide(state.player, ob, state.alive, dispatch);
//       });

//       dispatch({
//         type: "UPDATE_SCORE",
//         payload: {
//           score: (state.score += 1)
//         }
//       });

//       if (state.player.landed === true) {
//         player.dy = 0;
//         player.landed = false;
//       }
//       if (state.player.falling === true) {
//         player.dy = 5;
//       }
//       // bottom limit
//       if (state.player.y + 5 + player.height > 300) {
//         player.falling = false;
//         player.jumping = false;
//         player.landed = true;
//         player.dy = 0;
//       } else if (state.player.y + state.player.dy < 0) {
//         //top limit
//         player.y = 0;
//       } else {
//         player.y = player.y + player.dy;
//       }

//       dispatch({
//         type: "RENDER",
//         payload: {
//           player
//         }
//       });
//     }, 25);
//     return () => clearTimeout(handle);
//   }, [state]);

//   return (
//     <>
//       {state.playing && (
//         <div>
//           <Score score={state.score} />
//           <div className="container">
//             {state.obstacles.map(({ type, ...style }) => (
//               <Obstacle type={type} style={style} />
//             ))}
//             <Paddle movement={state.player} />
//           </div>
//         </div>
//       )}
//       {!state.playing && <GameOver score={state.score} />}
//     </>
//   );
// }
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grommet } from "grommet";
import { normalizeColor } from "grommet/utils";
import { rgba } from "polished";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Game from "./components/game/Game";

import { Auth } from "./auth/auth";

import "./App.css";

const theme = {
  global: {
    colors: {
      "light-2": "#f5f5f5",
      text: {
        light: "rgba(0, 0, 0, 0.87)"
      },
      primary: "#303f9f"
    },
    edgeSize: {
      small: "14px"
    },
    elevation: {
      light: {
        medium:
          "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
      }
    },
    font: {
      size: "14px",
      height: "20px"
    }
  },
  button: {
    border: {
      width: "1px",
      radius: "4px"
    },
    padding: {
      vertical: "8px",
      horizontal: "16px"
    },
    extend: props => `
         text-transform: uppercase;
         font-size: 0.875rem;
         font-weight: 500;
         line-height: normal;
    `
    //   ${!props.primary &&
    //     `
    //     border-color: ${rgba(
    //       normalizeColor(props.colorValue, props.theme),
    //       0.5
    //     )};
    //     color: ${normalizeColor(props.colorValue, props.theme)};
    //     :hover {
    //        box-shadow: none;
    //        background-color: ${rgba(
    //          normalizeColor(props.colorValue, props.theme),
    //          0.08
    //        )};
    //      }
    //    `}
    //  `
  }
};

export default function() {
  return (
    <Grommet theme={theme}>
      <Auth>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/game" component={Game} />
            </Switch>
          </div>
        </Router>
      </Auth>
    </Grommet>
  );
}

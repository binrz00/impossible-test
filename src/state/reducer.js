import axios from "axios";
export default function reducer(state, action) {
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
    case "UPDATE_OBSTACLES":
      return {
        ...state,
        obstacles: {
          ...state.obstacles,
          ...action.payload
        }
      };
    case "UPDATE_DISPLAYBLOCKS":
      return {
        ...state,
        displayBlocks: {
          ...state.displayBlocks,
          ...action.payload
        }
      };
    case "UPDATE_SCORE":
      return {
        ...state,
        score: action.payload.score
      };
    case "GAMEOVER":
      return {
        ...state,
        playing: false
      };
    case "NEW_GAME":
      return {};

    // console.log(res);

    default:
      throw new Error("Event not found: ", action.type);
  }
}

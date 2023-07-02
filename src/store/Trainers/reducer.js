import { GET_TRAINERS_SUCCESS, GET_TRAINERS_FAIL } from "./actionTypes"

const INIT_STATE = {
  trainers: [],
  error: {},
}

const trainers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TRAINERS_SUCCESS:
      return {
        ...state,
        trainers: action.payload,
      }

    case GET_TRAINERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default trainers

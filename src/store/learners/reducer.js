import { GET_LEARNERS_LIST_FAIL, GET_LEARNERS_LIST_SUCCESS } from "./actionTypes"

const INIT_STATE = {
  learners: [],
  error: {},
}

const learners = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LEARNERS_LIST_SUCCESS:
      return {
        ...state,
        learners: action.payload,
      }

    case GET_LEARNERS_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default learners

import { GET_ADMIN_LIST_SUCCESS, GET_ADMIN_LIST_FAIL } from "./actionTypes"

const INIT_STATE = {
  admins: [],
  error: {},
}

const admins = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ADMIN_LIST_SUCCESS:
      return {
        ...state,
        admins: action.payload,
      }

    case GET_ADMIN_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default admins

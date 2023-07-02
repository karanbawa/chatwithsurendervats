import { GET_TRANSACTION_FAIL, GET_TRANSACTION_SUCCESS } from "./actionTypes"


const INIT_STATE = {
  transactions: [],
  error: {},
}

const transactions = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
      }

    case GET_TRANSACTION_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default transactions

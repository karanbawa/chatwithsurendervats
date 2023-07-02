import { GET_CUSTOMERS_LIST_SUCCESS, GET_CUSTOMERS_LIST_FAIL } from "./actionTypes"

const INIT_STATE = {
  customers: [],
  error: {},
}

const customers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_LIST_SUCCESS:
      return {
        ...state,
        customers: action.payload,
      }

    case GET_CUSTOMERS_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default customers

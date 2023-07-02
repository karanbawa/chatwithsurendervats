import {
  ADDDISCOUNTFALIURE,
  ADDDISCOUNTSUCCESS,
  GETDISCOUNTFALIURE,
  GETDISCOUNTSUCCESS,
} from "./actionTypes"

const initialState = {
  discount: [],
  totalDiscounts: 0,
  error: "",
}
const discounts = (state = initialState, action) => {
  switch (action.type) {
    case GETDISCOUNTSUCCESS:
      return {
        ...state,
        discount: action.payload.discount,
        totalDiscounts: action.payload.totalDiscounts,
      }
      break
    case GETDISCOUNTFALIURE:
      return {
        ...state,
        error: action.payload,
      }
      break
    case ADDDISCOUNTSUCCESS:
      return {
        ...state,
        discount: [...state.discount, action.payload.discount],
        totalDiscounts: state.discount.length,
      }
      break
    case ADDDISCOUNTFALIURE:
      return {
        ...state,
        error: action.payload,
      }
      break
    default:
      return state
      break
  }
}
export default discounts;
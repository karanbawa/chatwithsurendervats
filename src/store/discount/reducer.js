import { GETDISCOUNTFALIURE, GETDISCOUNTSUCCESS } from "./actionTypes";

const initialState = {
  discount: [],
  totalDiscounts:0,
  error:""
}
export const discounts = (state = initialState, action) => {
  switch (action.type) {
    case GETDISCOUNTSUCCESS:
    return{
        ...state,
        discount: action.payload.discount,
        totalDiscounts:action.payload.totalDiscounts
      }
      break;
      case GETDISCOUNTFALIURE:
        return{
          ...state,
          error:action.payload
        }
    default:
      return state
      break;
  }
}

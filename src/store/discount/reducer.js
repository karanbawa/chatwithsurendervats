import { GETDISCOUNTFALIURE, GETDISCOUNTSUCCESS } from "./actionTypes";

const initialState = {
  discount: [],
  totalDiscounts:0,
  error:""
}
const discounts = (state = initialState, action) => {
  switch (action.type) {
    case GETDISCOUNTSUCCESS:
    return{
        ...state,
        discount: action.payload.discount,
        totalDiscounts:action.payload.totalDiscounts
      }
      case GETDISCOUNTFALIURE:
        return{
          ...state,
          error:action.payload
        }
    default:
      return state
  }
}

export default discounts;

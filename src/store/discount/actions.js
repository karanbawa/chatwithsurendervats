
import { GETDISCOUNT, GETDISCOUNTFALIURE } from "./actionTypes";

export const getDiscount = () => {
    return {
        type : GETDISCOUNT,
    }
}
export const discountError =(error) => {
    return{
        type: GETDISCOUNTFALIURE,
        payload:error
    }
}
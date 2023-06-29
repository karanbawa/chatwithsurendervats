
import { ADDDISCOUNT, ADDDISCOUNTFALIURE, GETDISCOUNT, GETDISCOUNTFALIURE } from "./actionTypes";

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
export const addDiscount = (discount) => {
    return{
        type: ADDDISCOUNT,
        payload:discount
    }
}
export const adddiscountError =(error) => {
    return{
        type: ADDDISCOUNTFALIURE,
        payload:error
    }
}
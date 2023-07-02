import { GET_CUSTOMERS_LIST, GET_CUSTOMERS_LIST_FAIL, GET_CUSTOMERS_LIST_SUCCESS } from "./actionTypes"

export const getCustomersList = () => ({
  type: GET_CUSTOMERS_LIST,
})

export const getCustomersListSuccess = customers => ({
  type: GET_CUSTOMERS_LIST_SUCCESS,
  payload: customers,
})

export const getCustomersListFail = error => ({
  type: GET_CUSTOMERS_LIST_FAIL,
  payload: error,
})

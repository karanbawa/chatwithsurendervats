import { GET_ADMIN_LIST, GET_ADMIN_LIST_FAIL, GET_ADMIN_LIST_SUCCESS } from "./actionTypes"


export const getAdminList = () => ({
  type: GET_ADMIN_LIST,
})

export const getAdminListSuccess = customers => ({
  type: GET_ADMIN_LIST_SUCCESS,
  payload: customers,
})

export const getAdminListFail = error => ({
  type: GET_ADMIN_LIST_FAIL,
  payload: error,
})

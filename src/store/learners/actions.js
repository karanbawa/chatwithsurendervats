import { GET_LEARNERS_LIST, GET_LEARNERS_LIST_FAIL, GET_LEARNERS_LIST_SUCCESS } from "./actionTypes"

export const getLearnersList = () => ({
  type: GET_LEARNERS_LIST,
})

export const getLearnersListSuccess = learners => ({
  type: GET_LEARNERS_LIST_SUCCESS,
  payload: learners,
})

export const getLearnersListFail = error => ({
  type: GET_LEARNERS_LIST_FAIL,
  payload: error,
})

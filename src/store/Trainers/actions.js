import { GET_TRAINERS, GET_TRAINERS_FAIL, GET_TRAINERS_SUCCESS } from "./actionTypes"


export const getTrainers = () => ({
  type: GET_TRAINERS,
})

export const getTrainersSuccess = trainers => ({
  type: GET_TRAINERS_SUCCESS,
  payload: trainers,
})

export const getTrainersFail = error => ({
  type: GET_TRAINERS_FAIL,
  payload: error,
})

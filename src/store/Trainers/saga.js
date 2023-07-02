import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_TRANSACTION } from "./actionTypes"

import { getTrainersList } from "helpers/backend_helper"
import { getTrainersFail, getTrainersSuccess } from "./actions"

function* fetchTrainers() {
  try {
    const response = yield call(getTrainersList)
    yield put(getTrainersSuccess(response))
  } catch (error) {
    yield put(getTrainersFail(error))
  }
}

function* trainersSaga() {
  yield takeEvery(GET_TRANSACTION, fetchTrainers);
}

export default trainersSaga

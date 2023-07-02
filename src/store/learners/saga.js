import { call, put, takeEvery } from "redux-saga/effects"
import { getLearnersListFail, getLearnersListSuccess } from "./actions"
import { GET_CUSTOMERS_LIST, GET_LEARNERS_LIST } from "./actionTypes"
import { getLearnersList } from "helpers/backend_helper"

function* fetchLearnersList() {
  try {
    const response = yield call(getLearnersList)
    yield put(getLearnersListSuccess(response))
  } catch (error) {
    yield put(getLearnersListFail(error))
  }
}

function* learnersSaga() {
  yield takeEvery(GET_LEARNERS_LIST, fetchLearnersList);
}

export default learnersSaga

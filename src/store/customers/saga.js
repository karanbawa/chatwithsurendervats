import { call, put, takeEvery } from "redux-saga/effects"
import { getCustomersListFail, getCustomersListSuccess } from "./actions"
import { GET_CUSTOMERS_LIST } from "./actionTypes"

function* fetchTransactions() {
  try {
    const response = yield call(getCustomersList)
    yield put(getCustomersListSuccess(response))
  } catch (error) {
    yield put(getCustomersListFail(error))
  }
}

function* customersSaga() {
  yield takeEvery(GET_CUSTOMERS_LIST, fetchTransactions);
}

export default customersSaga

import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_TRANSACTION } from "./actionTypes"

import { getTransactions } from "helpers/backend_helper"
import { getTransactionsFail, getTransactionsSuccess } from "./actions"

function* fetchTransactions() {
  try {
    const response = yield call(getTransactions)
    yield put(getTransactionsSuccess(response))
  } catch (error) {
    yield put(getTransactionsFail(error))
  }
}

function* transactionsSaga() {
  yield takeEvery(GET_TRANSACTION, fetchTransactions);
}

export default transactionsSaga

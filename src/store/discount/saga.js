import { getDiscountList } from "helpers/backend_helper"
import {
  GETDISCOUNT,
  GETDISCOUNTFALIURE,
  GETDISCOUNTSUCCESS,
} from "./actionTypes"
import { takeEvery, put, call } from "redux-saga/effects"
import { showToastError } from "helpers/toastBuilder"

function* getDiscount() {
  try {
    let data = yield call(getDiscountList)
    yield put({ type: GETDISCOUNTSUCCESS, payload: data.data })
  } catch (error) {
    showToastError("Fail to fetch record,Please try after some time", "Error")
    yield put({ type: GETDISCOUNTFALIURE, payload: error })
  }
}

function* discountSaga() {
  yield takeEvery(GETDISCOUNT, getDiscount)
}
export default discountSaga

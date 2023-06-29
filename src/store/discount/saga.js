import { getDiscountList, addDiscountCoupon } from "helpers/backend_helper";
import {
  ADDDISCOUNT,
  ADDDISCOUNTFALIURE,
  ADDDISCOUNTSUCCESS,
  GETDISCOUNT,
  GETDISCOUNTFALIURE,
  GETDISCOUNTSUCCESS,
} from "./actionTypes"
import { takeEvery, put, call } from "redux-saga/effects"

import { showToastError, showToastSuccess } from "helpers/toastBuilder"

function* getDiscount() {
  try {
    let data = yield call(getDiscountList)
    yield put({ type: GETDISCOUNTSUCCESS, payload: data.data })
  } catch (error) {
    showToastError("Fail to fetch record,Please try after some time", "Error")
    yield put({ type: GETDISCOUNTFALIURE, payload: error })
  }
}

function* addDiscount({ payload:  discount  }) {
  try {
    //console.log(discount)
    let data = yield call(addDiscountCoupon,discount)
    console.log(data)
    showToastSuccess("Added Discount Coupon successfully","Success");
    yield put({ type: ADDDISCOUNTSUCCESS, payload: data.data })
  } catch (error) {
    showToastError("Fail to fetch record,Please try after some time", "Error")
    yield put({ type: ADDDISCOUNTFALIURE, payload: error })
  }
}

function* discountSaga() {
  yield takeEvery(GETDISCOUNT, getDiscount)
  yield takeEvery(ADDDISCOUNT, addDiscount)
}
export default discountSaga

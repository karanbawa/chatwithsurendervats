import { call, put, takeEvery } from "redux-saga/effects"
import { getAdminListFail, getAdminListSuccess } from "./actions"
import { GET_ADMIN_LIST } from "./actionTypes"
import { getAdminList } from "helpers/backend_helper"

function* fetchAdmins() {
  try {
    const response = yield call(getAdminList)
    yield put(getAdminListSuccess(response))
  } catch (error) {
    yield put(getAdminListFail(error))
  }
}

function* adminsSaga() {
  yield takeEvery(GET_ADMIN_LIST, fetchAdmins);
}

export default adminsSaga

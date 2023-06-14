import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"

import { postRegister } from "helpers/backend_helper"
import { showToastError, showToastSuccess } from "helpers/toastBuilder"



// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {

  try {
    const response = yield call(postRegister, user)
    showToastSuccess("User is registered successfully", "SUCCESS");

    yield put(registerUserSuccessful(response))
  } catch (error) {
    showToastError('Sorry! Failed to register, plese try again', 'error');
    yield put(registerUserFailed(error))
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga

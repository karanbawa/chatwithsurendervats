import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";
import { showToastError , showToastSuccess } from "helpers/toastBuilder";
//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import { postLogin } from "helpers/backend_helper";
const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
  try {
      const response = yield call(postLogin, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("authUser", JSON.stringify(response));
      if(response.statusCode ==="10000"){
        showToastSuccess("Login is Successfull","Success")
      }
      yield put(loginSuccess(response));
    history('/dashboard');
  } catch (error) {
    showToastError("Email and Password does not match","Error")
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
    }
    history('/login');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* socialLogin({ payload: { type, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(fireBaseBackend.socialLoginUser, type);
      if (response) {
        history("/dashboard");
      } else {
        history("/login");
      }
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    if(response)
    history("/dashboard");
  } catch (error) {
    console.log("error",error)
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;

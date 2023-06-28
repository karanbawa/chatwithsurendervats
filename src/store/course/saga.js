import { takeLatest, put, takeEvery, call } from 'redux-saga/effects';
import { ADD_COURSE, ADD_COURSE_SUCCESS, ADD_COURSE_FAILURE } from './actionTypes';
import { addCourse } from "helpers/backend_helper";
import { addCourseSuccess } from './actions';

function* courseadd({ payload: { data} }) {
  try {
    console.log("saga file");
    const response = yield call(addCourse, data)
    yield put(addCourseSuccess(response));
  }
  catch (error) {
    console.log(error);
  }
}




export default function* courseSaga() {
  yield takeEvery(ADD_COURSE, courseadd);
  // Add other sagas if needed

}

import { ADD_COURSE, ADD_COURSE_SUCCESS, ADD_COURSE_FAILURE } from './actionTypes';

export const addCourse = (data) => {
  return {
    type: ADD_COURSE,
    payload: data
  };
};

export const addCourseSuccess = (data) => {
  return {
    type: ADD_COURSE_SUCCESS,
    payload: data
  };
};

export const addCourseFailure = (error) => {
  return {
    type: ADD_COURSE_FAILURE,
    payload: error
  };
};

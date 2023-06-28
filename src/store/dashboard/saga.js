import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Crypto Redux States
import {
    GET_SUBSCRIPTIONS, 
    GET_STUDENTS, 
    GET_VIDEOS, 
    GET_REVENUE, 
    GET_RATINGS, 
    GET_EARNINGS,
} from "./actionTypes";

import { 
    getSubscriptionsSuccess,
    getStudentsSuccess,
    getVideosSuccess,
    getRevenueSuccess,
    getRatingsSuccess,
    getEarningsSuccess,
    getSubscriptionsFail,
    getStudentsFail,
    getVideosFail,
    getRevenueFail,
    getRatingsFail,
    getEarningsFail
 } from "./actions";

import { 
    getSubcriptions,
    getStudents,
    getVideos,
    getRevenue,
    getRatings,
    getEarnings
 } from "helpers/backend_helper";

// API call function 
function* fetchSubcriptionsCountFromAPI() {
    try
    {
        const response = yield call(getSubcriptions);
        yield put(getSubscriptionsSuccess(response.data));
    }
    catch(error)
    {
        yield put(getSubscriptionsFail(error)) 
    }
  };    

  function* fetchStudentsCountFromAPI() {
    try
    {
        const response = yield call(getStudents);
        yield put(getStudentsSuccess(response.data));
    }
    catch(error)
    {
        yield put(getStudentsFail(error)) 
    }
  };    
  
  function* fetchVideosCountFromAPI() {
    try
    {
        const response = yield call(getVideos);
        yield put(getVideosSuccess(response.data));
    }
    catch(error)
    {
        yield put(getVideosFail(error)) 
    }
  };    
  
  function* fetchRevenueCountFromAPI() {
    try
    {
        const response = yield call(getRevenue);
        yield put(getRevenueSuccess(response.data));
    }
    catch(error)
    {
        yield put(getRevenueFail(error)) 
    }
  };    
  
  function* fetchRatingsCountFromAPI() {
    try
    {
        const response = yield call(getRatings);
        yield put(getRatingsSuccess(response.data));
    }
    catch(error)
    {
        yield put(getRatingsFail(error)) 
    }
  };    
  
  function* fetchEarningsCountFromAPI() {
    try
    {
        const response = yield call(getEarnings);
        yield put(getEarningsSuccess(response.data));
    }
    catch(error)
    {
        yield put(getEarningsFail(error)) 
    }
  };      

  export default function* dashboardSaga() {
    yield takeEvery(GET_SUBSCRIPTIONS, fetchSubcriptionsCountFromAPI);
    yield takeEvery(GET_STUDENTS, fetchStudentsCountFromAPI);
    yield takeEvery(GET_VIDEOS, fetchVideosCountFromAPI);
    yield takeEvery(GET_REVENUE, fetchRevenueCountFromAPI);
    yield takeEvery(GET_RATINGS, fetchRatingsCountFromAPI);
    yield takeEvery(GET_EARNINGS, fetchEarningsCountFromAPI);
  }
  
  
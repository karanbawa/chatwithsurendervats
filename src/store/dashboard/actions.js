import {
    GET_SUBSCRIPTIONS, 
    GET_STUDENTS, 
    GET_VIDEOS, 
    GET_REVENUE, 
    GET_RATINGS, 
    GET_EARNINGS,
    GET_SUBSCRIPTIONS_SUCCESS, 
    GET_STUDENTS_SUCCESS, 
    GET_VIDEOS_SUCCESS, 
    GET_REVENUE_SUCCESS, 
    GET_RATINGS_SUCCESS, 
    GET_EARNINGS_SUCCESS,
    GET_SUBSCRIPTIONS_FAIL, 
    GET_STUDENTS_FAIL, 
    GET_VIDEOS_FAIL, 
    GET_REVENUE_FAIL, 
    GET_RATINGS_FAIL, 
    GET_EARNINGS_FAIL,
} from "./actionTypes";

export const getSubscriptions = () => ({
    type: GET_SUBSCRIPTIONS,
});

export const getStudents = () => ({
    type: GET_STUDENTS,
});

export const getVideos = () => ({
    type: GET_VIDEOS,
});

export const getRevenue = () => ({
    type: GET_REVENUE,
});
export const getRatings = () => ({
    type: GET_RATINGS,
});
export const getEarnings = () => ({
    type: GET_EARNINGS,
});

export const getSubscriptionsSuccess = subscriptions => ({
    type: GET_SUBSCRIPTIONS_SUCCESS,
    payload: subscriptions,
});

export const getStudentsSuccess = students => ({
    type: GET_STUDENTS_SUCCESS,
    payload: students,
});

export const getVideosSuccess = videos => ({
    type: GET_VIDEOS_SUCCESS,
    payload: videos,
});

export const getRevenueSuccess = revenue => ({
    type: GET_REVENUE_SUCCESS,
    payload: revenue,
});

export const getRatingsSuccess = ratings => ({
    type: GET_RATINGS_SUCCESS,
    payload: ratings,
});

export const getEarningsSuccess = earnings => ({
    type: GET_EARNINGS_SUCCESS,
    payload: earnings,
});

export const getSubscriptionsFail = subscriptions => ({
    type: GET_SUBSCRIPTIONS_FAIL,
    payload: subscriptions,
});

export const getStudentsFail = students => ({
    type: GET_STUDENTS_FAIL,
    payload: students,
});

export const getVideosFail = videos => ({
    type: GET_VIDEOS_FAIL,
    payload: videos,
});

export const getRevenueFail = revenue => ({
    type: GET_REVENUE_FAIL,
    payload: revenue,
});

export const getRatingsFail = ratings => ({
    type: GET_RATINGS_FAIL,
    payload: ratings,
});

export const getEarningsFail = earnings => ({
    type: GET_EARNINGS_FAIL,
    payload: earnings,
});
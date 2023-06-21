import {
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
  
const INIT_STATE = {
    subscriptions: 0,
    students: 0,
    videos: 0,
    revenue: 0,
    ratings: 0,
    earnings: 0,
    subscriptionsError: null,
    studentsError: null,
    videosError: null,
    revenueError: null,
    ratingsError: null,
    earningsError: null,
};
  
const Dashboard = (state = INIT_STATE, action) => {
    switch (action.type) {
          case GET_SUBSCRIPTIONS_SUCCESS:
            return {
              ...state,
              subscriptions: action.payload.totalEventSubscriptions,
              subscriptionsError: null,
            };
          case GET_STUDENTS_SUCCESS:
            return {
              ...state,
              students: action.payload.totalStudents,
              studentsError: null,
            };
          case GET_VIDEOS_SUCCESS:
            return {
              ...state,
              videos: action.payload.totalVideos,
              videosError: null,
            };
          case GET_REVENUE_SUCCESS:
            return {
              ...state,
              revenue: action.payload.totalRevenue,
              revenueError: null,
            };
          case GET_RATINGS_SUCCESS:
            return {
              ...state,
              ratings: action.payload.overAllRating,
              ratingsError: null,
            };
          case GET_EARNINGS_SUCCESS:
            return {
              ...state,
              earnings: action.payload.totalEarnings,
              earningsError: null,
            };
          case GET_SUBSCRIPTIONS_FAIL:
            return {
              ...state,
              subscriptionsError: action.payload.error,
            };
          case GET_STUDENTS_FAIL:
            return {
              ...state,
              studentsError: action.payload.error,
            };
          case GET_VIDEOS_FAIL:
            return {
              ...state,
              videosError: action.payload.error,
            };
          case GET_REVENUE_FAIL:
            return {
              ...state,
              revenueError: action.payload.error,
            };
          case GET_RATINGS_FAIL:
            return {
              ...state,
              ratingsError: action.payload.error,
            };
          case GET_EARNINGS_FAIL:
            return {
              ...state,
              earningsError: action.payload.error,
            };
          default:
            return state;
        }
      
};
  
  export default Dashboard;
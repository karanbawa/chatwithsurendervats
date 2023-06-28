import axios from "axios";
import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";

// Register Method
const postRegister = data => post(url.POST_REGISTER, data);
const postLogin = data => post(url.POST_LOGIN, data);

const getDiscountList = () => get(url.GET_DISCOUNT);


// DASHBOARD ITEMS COUNT
const getSubcriptions = () => get(url.GET_SUBSCRIPTIONS);
const getStudents = () => get(url.GET_STUDENTS);
const getVideos = () => get(url.GET_VIDEOS);
const getRevenue = () => get(url.GET_REVENUE);
const getRatings = () => get(url.GET_RATINGS);
const getEarnings = () => get(url.GET_EARNINGS);

const getCourses = () => get(url.GET_COURSES);

const addNewCourse = course => post(url.ADD_NEW_COURSE, course);

// update courses
const updateCourse= course => put(url.UPDATE_COURSE, course);

// delete courses
const deleteCourse = course =>
  del(url.DELETE_COURSE, { headers: { course } });

export {
  postRegister,
  getSubcriptions,
  getStudents,
  getVideos,
  getRevenue,
  getRatings,
  getEarnings,
  postLogin,
  getDiscountList,
  getCourses,
  addNewCourse,
  updateCourse,
  deleteCourse
};
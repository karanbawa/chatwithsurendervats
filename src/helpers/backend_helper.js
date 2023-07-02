import axios from "axios"
import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"

// Register Method
const postRegister = data => post(url.POST_REGISTER, data)
const postLogin = data => post(url.POST_LOGIN, data)

// DASHBOARD ITEMS COUNT
const getSubcriptions = () => get(url.GET_SUBSCRIPTIONS)
const getStudents = () => get(url.GET_STUDENTS)
const getVideos = () => get(url.GET_VIDEOS)
const getRevenue = () => get(url.GET_REVENUE)
const getRatings = () => get(url.GET_RATINGS)
const getEarnings = () => get(url.GET_EARNINGS)

// GET BOOKS
const getBooks = () => get(url.GET_BOOKS)
// ADD NEW BOOK
const addNewBook = book => post(url.ADD_NEW_BOOK, book)
// UPDATE BOOK
const updateBook = book => put(url.UPDATE_BOOK, book)
// DELETE BOOK
const deleteBook = book => del(url.DELETE_BOOK, { headers: { book } })

const getDiscountList = () => get(url.GET_DISCOUNT)

const addDiscountCoupon = data => post(url.ADD_DISCOUNT_COUPON, data)

const getCourses = () => get(url.GET_COURSES)

const addNewCourse = course => post(url.ADD_NEW_COURSE, course)

// update courses
const updateCourse = course => put(url.UPDATE_COURSE, course)

// delete courses
const deleteCourse = course => del(url.DELETE_COURSE, { headers: { course } })

// get tasks
export const getTransactions = () => get(url.GET_TRANSACTIONS);

// Customers
export const getCustomersList = () => get(url.GET_CUSTOMERS_LIST);

// Learners
export const getLearnersList = () => get(url.GET_LEARNERS_LIST);

// Trainers
export const getTrainersList = () => get(url.GET_TRAINERS_LIST);

// Admins
export const getAdminList = () => get(url.GET_ADMIN_LIST);

export {
  postRegister,
  postLogin,
  getSubcriptions,
  getStudents,
  getVideos,
  getRevenue,
  getRatings,
  getEarnings,
  getBooks,
  addNewBook,
  updateBook,
  deleteBook,
  getDiscountList,
  getCourses,
  addNewCourse,
  updateCourse,
  deleteCourse,
  addDiscountCoupon,
}

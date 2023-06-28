import axios from "axios";
import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";

// Register Method
const postRegister = data => post(url.POST_REGISTER, data);
const postLogin = data => post(url.POST_LOGIN, data);

// DASHBOARD ITEMS COUNT
const getSubcriptions = () => get(url.GET_SUBSCRIPTIONS);
const getStudents = () => get(url.GET_STUDENTS);
const getVideos = () => get(url.GET_VIDEOS);
const getRevenue = () => get(url.GET_REVENUE);
const getRatings = () => get(url.GET_RATINGS);
const getEarnings = () => get(url.GET_EARNINGS);

// GET BOOKS
const getBooks = () => get(url.GET_BOOKS);
// ADD NEW BOOK
const addNewBook = book => post(url.ADD_NEW_BOOK, book);
// UPDATE BOOK
const updateBook = book => put(url.UPDATE_BOOK, book);
// DELETE BOOK
const deleteBook = book =>del(url.DELETE_BOOK, { headers: { book } });

const getDiscountList = () => get(url.GET_DISCOUNT);


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
  getDiscountList
};



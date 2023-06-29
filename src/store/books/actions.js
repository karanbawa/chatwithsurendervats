import {
  GET_BOOKS,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAIL,
  ADD_NEW_BOOK,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAIL,
  UPDATE_BOOK,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAIL,
  DELETE_BOOK,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAIL,
} from "./actionTypes";

export const getBooks = () => ({
  type: GET_BOOKS,
})

export const getBooksSuccess = books => ({
  type: GET_BOOKS_SUCCESS,
  payload: books,
})

export const getBooksFail = error => ({
  type: GET_BOOKS_FAIL,
  payload: error,
})

export const addNewBook = book => ({
  type: ADD_NEW_BOOK,
  payload: book,
})

export const addBookSuccess = book => ({
  type: ADD_BOOK_SUCCESS,
  payload: book,
})

export const addBookFail = error => ({
  type: ADD_BOOK_FAIL,
  payload: error,
})

export const updateBook = book => ({
  type: UPDATE_BOOK,
  payload: book,
})

export const updateBookSuccess = book => ({
  type: UPDATE_BOOK_SUCCESS,
  payload: book,
})

export const updateBookFail = error => ({
  type: UPDATE_BOOK_FAIL,
  payload: error,
})

export const deleteBook = book => ({
  type: DELETE_BOOK,
  payload: book,
})

export const deleteBookSuccess = book => ({
  type: DELETE_BOOK_SUCCESS,
  payload: book,
})

export const deleteBookFail = error => ({
  type: DELETE_BOOK_FAIL,
  payload: error,
})

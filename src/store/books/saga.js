import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_BOOKS,
  ADD_NEW_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
} from "./actionTypes"

import {
  getBooksSuccess,
  getBooksFail,
  addBookSuccess,
  addBookFail,
  updateBookSuccess,
  updateBookFail,
  deleteBookSuccess,
  deleteBookFail,
} from "./actions";

import {
    getBooks,
    addNewBook,
    updateBook,
    deleteBook
} from "helpers/backend_helper"

function* fetchBooks() {
  try {
    const response = yield call(getBooks);
    yield put(getBooksSuccess(response.data));
  } catch (error) {
    yield put(getBooksFail(error));
  }
}

function* onAddNewBook({ payload: book }) {
  try {
    const response = yield call(addNewBook, book);
    yield put(addBookSuccess(response));
  } catch (error) {
    yield put(addBookFail(error));
  }
}

function* onUpdateBook({ payload: book }) {
  try {
    const response = yield call(updateBook, book);
    yield put(updateBookSuccess(response));
  } catch (error) {
    yield put(updateBookFail(error));
  }
}

function* onDeleteBook({ payload: book }) {
  try {
    const response = yield call(deleteBook, book);
    yield put(deleteBookSuccess(response));
  } catch (error) {
    yield put(deleteBookFail(error));
  }
}

export default function* booksSaga() {
    yield takeEvery(GET_BOOKS, fetchBooks);
    yield takeEvery(ADD_NEW_BOOK, onAddNewBook);
    yield takeEvery(UPDATE_BOOK, onUpdateBook);
    yield takeEvery(DELETE_BOOK, onDeleteBook);
}

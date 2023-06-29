import {
    GET_BOOKS_SUCCESS,
    GET_BOOKS_FAIL,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAIL,
    UPDATE_BOOK_SUCCESS,
    UPDATE_BOOK_FAIL,
    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_FAIL,
} from "./actionTypes";

const INIT_STATE = {
    books: [] 
};

const Books = (state = INIT_STATE, action) => {
    switch (action.type) {

    case GET_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload.books,
      };

    case GET_BOOKS_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };

    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        books: [...state.books, action.payload],
      };

    case ADD_BOOK_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };

    case UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        books: state.books.map(book =>
          (book.id + '') === (action.payload.id + '')
            ? { book, ...action.payload }
            : book
        ),
      };

    case UPDATE_BOOK_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };

    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        books: state.books.filter(
          book => book.id !== action.payload
        ),
      };

    case DELETE_BOOK_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
      
    }
}

export default Books;
  
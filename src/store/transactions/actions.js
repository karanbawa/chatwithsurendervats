import { GET_TRANSACTION, GET_TRANSACTION_FAIL, GET_TRANSACTION_SUCCESS } from "./actionTypes"

export const getTransactions = () => ({
  type: GET_TRANSACTION,
})

export const getTransactionsSuccess = trasactions => ({
  type: GET_TRANSACTION_SUCCESS,
  payload: transactions,
})

export const getTransactionsFail = error => ({
  type: GET_TRANSACTION_FAIL,
  payload: error,
})

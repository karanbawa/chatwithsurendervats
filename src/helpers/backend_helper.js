import axios from "axios";
import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";

// Register Method
const postRegister = data => post(url.POST_REGISTER, data);
const postLogin = data => post(url.POST_LOGIN, data);
const getDiscountList = () => get(url.GET_DISCOUNT);

export {
  postRegister,
  postLogin,
  getDiscountList
};

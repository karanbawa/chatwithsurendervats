import axios from "axios";

import { del, get, post, put } from "./api_helper";

import * as url from "./url_helper";
const addCourse = data => post(url.ADD_COURSE, data);
export { addCourse };

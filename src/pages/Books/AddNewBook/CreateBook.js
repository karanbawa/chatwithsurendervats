import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
// import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "../../../components/Common/TableContainer" 
import * as Yup from "yup"
import { useFormik } from "formik"

//import components
import Breadcrumbs from "../../../components/Common/Breadcrumb"
// import DeleteModal from "../../components/Common/DeleteModal"

import {
  getBooks as onGetBooks,
  addNewBook as onAddNewBook,
  updateBook as onUpdateBook,
  deleteBook as onDeleteBook,
} from "store/books/actions";


//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux"
// import EcommerceOrdersModal from "./EcommerceOrdersModal";

import {
  Button,
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  Card,
  CardBody,
  Badge
} from "reactstrap"

function CreateBook() {
    document.title = " Create Book | TWT -Train With Trainer";

    return (
        <div>
        <Breadcrumbs title="Ecommerce" breadcrumbItem="Create Book" />
        </div>
           )
}

export default CreateBook
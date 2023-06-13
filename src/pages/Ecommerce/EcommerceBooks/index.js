import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isEmpty } from "lodash";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../../components/Common/TableContainer';
import * as Yup from "yup";
import { useFormik } from "formik";

//import components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import DeleteModal from '../../../components/Common/DeleteModal';

import {
  getBooks as onGetBooks,
  addNewBook as onAddNewBook,
  updateBook as onUpdateBook,
  deleteBook as onDeleteBook,
} from "store/actions";

import {
  
  BookName,
  BookCategory,  
  BookStatus
}
  from "./EcommerceBookCol";

//redux
import { useSelector, useDispatch } from "react-redux";
//import EcommerceBooksModal from "./EcommerceBooksModal";

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
} from "reactstrap";

function EcommerceBooks() {

  //meta title
  document.title = "Books | TWT -Train With Trainer";

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [bookList, setBookList] = useState([]);
  const [book, setBook] = useState(null);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      
      bookName: (book && book.bookName) || '',
      bookCategory:(book && book.bookCategory) || '',
   
      bookStatus: (book && book.bookStatus) || 'Pending',
      
    },
    validationSchema: Yup.object({
   
      bookName: Yup.string().required("Please Enter Your Book Name"),
      
      bookCategory: Yup.string().required("Please Enter Your Book category"),

   
      bookStatus: Yup.string().required("Please Enter Your Book Status"),
    
      
    }),


    
    onSubmit: (values) => {
      if (isEdit) {
        const updateBook = {
          id: book ? book.id : 0,
          
          bookName: values.bookName,
          bookCategory:values.bookCategory,
          
          bookStatus: values.bookStatus,
          
          
        };
        // update book
        dispatch(onUpdateBook(updateBook));
        validation.resetForm();
      } else {
        const newBook = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          
          bookName: values["bookName"],
          bookCategory:values["bookCategory"],
        
          bookStatus: values["bookStatus"],
          
        };
        // save new book
        dispatch(onAddNewBook(newBook));
        validation.resetForm();
      }
      toggle();
    },
  });


  const toggleViewModal = () => setModal1(!modal1);

  const dispatch = useDispatch();
  const { books } = useSelector(state => ({
    books: state.ecommerce.books,
  }));

  useEffect(() => {
    if (books && !books.length) {
      dispatch(onGetBooks());
    }
  }, [dispatch, books]);

  useEffect(() => {
    setBookList(books);
  }, [books]);

  useEffect(() => {
    if (!isEmpty(books) && !!isEdit) {
      setBookList(books);
      setIsEdit(false);
    }
  }, [books]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setBook(null);
    } else {
      setModal(true);
    }
  };

  const handleBookClick = arg => {
    const book = arg;
    setBook({
      id: book.id,
  
      bookName: book.bookName,
      bookCategory:book.bookCategory,
   
      bookStatus: book.bookStatus,
 
    });

    setIsEdit(true);

    toggle();
  };










  //delete book
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (book) => {
    setBook(book);
    setDeleteModal(true);
  };

  const handleDeleteBook = () => {
    if (book && book.id) {
      dispatch(onDeleteBook(book.id));
      setDeleteModal(false);
    }
  };
  const handleBookClicks = () => {
    setBookList("");
    setIsEdit(false);
    toggle();
  };

  const columns = useMemo(
    () => [


      
      {
        Header: 'Book Name',
        accessor: 'bookName',
        filterable: true,
        Cell: (cellProps) => {
          return <BookName {...cellProps} />;
        }
      },
      {
        Header: 'Book Category',
        accessor: 'bookCategory',
        filterable: true,
        Cell: (cellProps) => {
          return <BookCategory {...cellProps} />;
        }
      },
 
      {
        Header: 'Book Status',
        accessor: 'bookStatus',
        filterable: true,
        Cell: (cellProps) => {
          return <BookStatus {...cellProps} />;
        }
      },
   
    
      {
        Header: 'Action',
        accessor: 'action',
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const bookData = cellProps.row.original;
                  handleBookClick(bookData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const bookData = cellProps.row.original;
                  onClickDelete(bookData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        }
      },
    ],
    []
  );

  return (
    <React.Fragment>
     {/* <EcommerceBooksModal isOpen={modal1} toggle={toggleViewModal} /> */}
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteBook}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Books" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={books}
                    isGlobalFilter={true}                    
                    isAddBookList={true}                  
                    handleBookClicks={handleBookClicks}
                    customPageSize={10}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Edit Book" : "Add Book"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Row>
                  <Col className="col-12">
                  
                    <div className="mb-3">
                      <Label className="form-label">Book Name</Label>
                      <Input
                        name="bookName"
                        type="text"
                        placeholder="Insert Book Name"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.bookName || ""}
                        invalid={
                          validation.touched.bookName && validation.errors.bookName ? true : false
                        }
                      />
                      {validation.touched.bookName && validation.errors.bookName ? (
                        <FormFeedback type="invalid">{validation.errors.bookName}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Book Category</Label>
                      <Input
                        name="bookCategory"
                        type="text"
                        placeholder="Insert Book Category"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.bookCategory || ""}
                        invalid={
                          validation.touched.bookCategory && validation.errors.bookCategory ? true : false
                        }
                      />
                      {validation.touched.bookCategory && validation.errors.bookCategory ? (
                        <FormFeedback type="invalid">{validation.errors.bookCategory}</FormFeedback>
                      ) : null}
                    </div>
                
                  
                    <div className="mb-3">
                      <Label className="form-label">Book Status</Label>
                      <Input
                        name="bookStatus"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.bookStatus || ""
                        }
                      >
                        <option>Pending</option>
                        <option>Active</option>
                        <option>Draft</option>
                        <option>Inactive</option>
                      </Input>
                      {validation.touched.bookStatus && validation.errors.bookStatus ? (
                        <FormFeedback type="invalid">{validation.errors.bookStatus}</FormFeedback>
                      ) : null}
                    </div>
                   
                    
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-success save-user"
                      >
                        Save button check
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
}
EcommerceBooks.propTypes = {
  preGlobalFilteredRows: PropTypes.any,

};


export default EcommerceBooks;
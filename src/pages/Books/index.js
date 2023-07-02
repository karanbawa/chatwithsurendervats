import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link, useHistory, useNavigate } from "react-router-dom"
import { isEmpty } from "lodash"
import TableContainer from "../../components/Common/TableContainer" 

//import components
import Breadcrumbs from "../../components/Common/Breadcrumb"
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

function Books() {
  document.title = "Books | TWT -Train With Trainer"

  const dispatch = useDispatch();
  // const history = useHistory();
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false)

  const [bookList, setBookList] = useState([])

  const [book, setBook] = useState(null)

  const BookName = (cell) => {
    return cell.value ? cell.value : "";
  };

  const BookCategory = (cell) => {
    return cell.value ? cell.value : "";
  };

  const BookStatus = (cell) => {
    
    const statusText = cell.value === true ? "Active" : (cell.value === false ? "Inactive" : "");

    return (
      <Badge
        className={`font-size-12 badge-soft-${(statusText === "Active" ? "Active" : "Inactive")} bg-${(statusText === "Active" ? "success" : "secondary")}`}
      >
        {statusText}
      </Badge>
    );
  };



  const { books } = useSelector(state => ({
    books: state.Books.books,
  }));

  // GET BOOKS 
  useEffect(() => {
      dispatch(onGetBooks());
  }, [dispatch]);

  // GET BOOKS LIST
  useEffect(() => {
    setBookList(books);
  }, [books]);

  // PUT BOOK
  useEffect(() => {
    if (!isEmpty(books) && !!isEdit) {
      setBookList(books);
      setIsEdit(false);
    }
  }, [books]);

  // EDIT WHEN BOOK IS CLICKED
  const handleBookClick = arg => {
    const books = arg;
    setBook({
      id: books.id,
      name: books.name,
      category: books.category,
      status: books.status,
    });

    setIsEdit(true);

  };

  // DELETE BOOK
  const onClickDelete = (book) => {
    setBook(book);
  };

  const handleDeleteBook = () => {
    if (book && book.id) {
      dispatch(onDeleteBook(book.id));
    }
  };

  
  const handleBookClicks = () => {
    navigate('/createbook');
  };

  const columns = useMemo(
    () => [

      {
        Header: 'Book Name',
        accessor: 'name',
        filterable: true,
        Cell: (cellProps) => {
          return <BookName {...cellProps} />;
        }
      },
      {
        Header: 'Book Category',
        accessor: 'category',
        filterable: true,
        Cell: (cellProps) => {
          return <BookCategory {...cellProps} />;
        }
      },
      {
        Header: 'Book Status',
        accessor: 'status',
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
                    isAddBook={true}
                    handleBookClicks={handleBookClicks}
                    customPageSize={10}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

Books.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default Books

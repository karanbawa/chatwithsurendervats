import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import { Link, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

import * as Yup from "yup";
import { useFormik } from "formik";

//import components
import Breadcrumbs from "components/Common/Breadcrumb";

import {
  getCourses as onGetCourses,
  addNewCourse as onAddNewCourse,
  updateCourse as onUpdateCourse,
  deleteCourse as onDeleteCourse,
} from "store/actions";  

import { CourseName, CourseCategory, CourseStatus } from "./EcommerceCourseCol"

//redux
import { useSelector, useDispatch } from "react-redux";

import {
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
import TableContainer from "components/Common/TableContainer";
import DeleteModal from "components/Common/DeleteModal";

function EcommerceCourses() {
  //meta title
  document.title = "Course | TWT -Train With Trainer";
  const history = useNavigate();

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [courseList, setCourseList] = useState([]);
  const [course, setCourse] = useState(null);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      CourseName: (course && course.CourseName) || "",
      CourseCategory: (course && course.CourseCategory) || "",

      CourseStatus: (course && course.CourseStatus) || "Pending",
    },
    validationSchema: Yup.object({
      CourseName: Yup.string().required("Please Enter Your Course Name"),

      CourseCategory: Yup.string().required("Please Enter Your Course category"),

      CourseStatus: Yup.string().required("Please Enter Your Course Status"),
    }),

    onSubmit: values => {
      if (isEdit) {
        const updateCourse = {
          // id: Course ? Course.id : 0,

          CourseName: values.CourseName,
          CourseCategory: values.CourseCategory,

          CourseStatus: values.CourseStatus,
        };
        // update Course
        dispatch(onUpdateCourse(updateCourse));
        validation.resetForm();
      } else {
        const newCourse = {
          // id: Math.floor(Math.random() * (30 - 20)) + 20,

          CourseName: values["CourseName"],
          CourseCategory: values["CourseCategory"],

          CourseStatus: values["CourseStatus"],
        };
        // save new Course
        dispatch(onAddNewCourse(newCourse));
        validation.resetForm();
      }
      toggle();
    },
  });
  const handleCustomerClick = arg => {
    const course = arg;

    setCourse({
      id: course.id,
      username: course.username,
      phone: course.phone,
      email: course.email,

      rating: course.rating,
      walletBalance: course.walletBalance,
      joiningDate: course.joiningDate,
    });

    setIsEdit(true);
    toggle();
  };

  const toggleViewModal = () => setModal1(!modal1);

  const dispatch = useDispatch();
  const { courses } = useSelector(state => ({
    courses: state.ecommerce.courses,
  }));

  useEffect(() => {
    // if (courses && !courses.length) {
    dispatch(onGetCourses());
    // }
  }, [dispatch]);

  useEffect(() => { 
    setCourseList(courses);
  }, [courses]);

  useEffect(() => {
    if (!isEmpty(courses) && !!isEdit) {
      setCourseList(courses);
      setIsEdit(false);
    }
  }, [courses]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setCourse(null);
    } else {
      setModal(true);
    }
  };

  const handleCourseClick = arg => {
    const course = arg;
    setCourse({
      id: course.id,

      CourseName: course.CourseName,
      CourseCategory: course.CourseCategory,

      CourseStatus: course.CourseStatus,
    });

    setIsEdit(true);

    toggle();
  };

  //delete Course
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = course => {
    setCourse(course);
    setDeleteModal(true);
  };

  const handleDeleteCourse = () => {
    if (course && course.id) {
      dispatch(onDeleteCourse(course.id));
      setDeleteModal(false);
    }
  };
  const handleCourseClicks = () => {
    setCourseList("");
    setIsEdit(false);
    history("/Course");
    // return <Link to="/Course"></Link>;
  };

  const columns = useMemo(
    () => [
      {
        Header: "Course Name",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <CourseName {...cellProps} />;
        },
      },
      {
        Header: "Course Category",
        accessor: "category",
        filterable: true,
        Cell: cellProps => {
          return <CourseCategory {...cellProps} />;
        },
      },

      {
        Header: "Course Status",
        accessor: "status",
        filterable: true,
        Cell: cellProps => {
          return <CourseStatus {...cellProps} />;
        },
      },

      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const CourseData = cellProps.row.original;
                  handleCourseClick(CourseData);
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
                  const CourseData = cellProps.row.original;
                  onClickDelete(CourseData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      {/* <CourseablesModal isOpen={modal1} toggle={toggleViewModal} /> */}
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCourse}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Courses" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  {/* {console.log(columns, courses, "abc")} */}
                  <TableContainer
                    columns={columns}
                    data={[...courses]}
                    isGlobalFilter={true}
                    isAddCourseList={true}
                    handleCourseClicks={handleCourseClicks}
                    customPageSize={10}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Edit Course" : "Add Course"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  e.prCourseDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Course Name</Label>
                      <Input
                        name="CourseName"
                        type="text"
                        placeholder="Insert Course Name"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.CourseName || ""}
                        invalid={
                          validation.touched.CourseName &&
                          validation.errors.CourseName
                            ? true
                            : false
                        }
                      />
                      {validation.touched.CourseName &&
                      validation.errors.CourseName ? (
                        <FormFeedback type="invalid">
                          {validation.errors.CourseName}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Course Category</Label>
                      <Input
                        name="CourseCategory"
                        type="text"
                        placeholder="Insert Course Category"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.CourseCategory || ""}
                        invalid={
                          validation.touched.CourseCategory &&
                          validation.errors.CourseCategory
                            ? true
                            : false
                        }
                      />
                      {validation.touched.CourseCategory &&
                      validation.errors.CourseCategory ? (
                        <FormFeedback type="invalid">
                          {validation.errors.CourseCategory}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Course Status</Label>
                      <Input
                        name="CourseStatus"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.CourseStatus || ""}
                      >
                        <option>Pending</option>
                        <option>Active</option>
                        <option>Draft</option>
                        <option>Inactive</option>
                      </Input>
                      {validation.touched.CourseStatus &&
                      validation.errors.CourseStatus ? (
                        <FormFeedback type="invalid">
                          {validation.errors.CourseStatus}
                        </FormFeedback>
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
EcommerceCourses.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default EcommerceCourses;
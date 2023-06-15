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
  getCourses as onGetCourses,
  addNewCourse as onAddNewCourse,
  updateCourse as onUpdateCourse,
  deleteCourse as onDeleteCourse,
} from "store/actions";

import {
  
  CourseName,
  CourseCategory,  
  CourseStatus
}
  from "./EcommerceCourseCol";

//redux
import { useSelector, useDispatch } from "react-redux";


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

function EcommerceCourses() {

  //meta title
  document.title = "Courses | TWT -Train With Trainer";

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [CourseList, setCourseList] = useState([]);
  const [Course, setCourse] = useState(null);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      
      CourseName: (Course && Course.CourseName) || '',
      CourseCategory:(Course && Course.CourseCategory) || '',
   
      CourseStatus: (Course && Course.CourseStatus) || 'Pending',
      
    },
    validationSchema: Yup.object({
   
      CourseName: Yup.string().required("Please Enter Your Course Name"),
      
      CourseCategory: Yup.string().required("Please Enter Your Course category"),

   
      CourseStatus: Yup.string().required("Please Enter Your Course Status"),
    
      
    }),


    
    onSubmit: (values) => {
      if (isEdit) {
        const updateCourse = {
          // id: Course ? Course.id : 0,
          
          CourseName: values.CourseName,
          CourseCategory:values.CourseCategory,
          
          CourseStatus: values.CourseStatus,
          
          
        };
        // update Course
        dispatch(onUpdateCourse(updateCourse));
        validation.resetForm();
      } else {
        const newCourse = {
          // id: Math.floor(Math.random() * (30 - 20)) + 20,
          
          CourseName: values["CourseName"],
          CourseCategory:values["CourseCategory"],
        
          CourseStatus: values["CourseStatus"],
          
        };
        // save new Course
        dispatch(onAddNewCourse(newCourse));
        validation.resetForm();
      }
      toggle();
    },
  });


  const toggleViewModal = () => setModal1(!modal1);

  const dispatch = useDispatch();
  const { Courses } = useSelector(state => ({
    Courses: state.ecommerce.courses,
  }));

  useEffect(() => {
    if (Courses && !Courses.length) {
      dispatch(onGetCourses());
    }
  }, [dispatch, Courses]);

  useEffect(() => {
    setCourseList(Courses);
  }, [Courses]);

  useEffect(() => {
    if (!isEmpty(Courses) && !!isEdit) {
      setCourseList(Courses);
      setIsEdit(false);
    }
  }, [Courses]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setCourse(null);
    } else {
      setModal(true);
    }
  };

  const handleCourseClick = arg => {
    const Course = arg;
    setCourse({
      id: Course.id,
  
      CourseName: Course.CourseName,
      CourseCategory:Course.CourseCategory,
   
      CourseStatus: Course.CourseStatus,
 
    });

    setIsEdit(true);

    toggle();
  };


  //delete Course
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (Course) => {
    setCourse(Course);
    setDeleteModal(true);
  };

  const handleDeleteCourse = () => {
    if (Course && Course.id) {
      dispatch(onDeleteCourse(Course.id));
      setDeleteModal(false);
    }
  };
  const handleCourseClicks = () => {
    setCourseList("");
    setIsEdit(false);
    toggle();
  };

  const columns = useMemo(
    () => [
      
      {
        Header: 'Course Name',
        accessor: 'CourseName',
        filterable: true,
        Cell: (cellProps) => {
          return <CourseName {...cellProps} />;
        }
      },
      {
        Header: 'Course Category',
        accessor: 'CourseCategory',
        filterable: true,
        Cell: (cellProps) => {
          return <CourseCategory {...cellProps} />;
        }
      },
 
      {
        Header: 'Course Status',
        accessor: 'CourseStatus',
        filterable: true,
        Cell: (cellProps) => {
          return <CourseStatus {...cellProps} />;
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
        }
      },
    ],
    []
  );

  return (
    <React.Fragment>
     {/* <EcommerceCoursesModal isOpen={modal1} toggle={toggleViewModal} /> */}
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
                  {console.log(columns, Courses, 'abc')}
                  <TableContainer
                    columns={columns}
                    data={[...Courses]}
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
                onSubmit={(e) => {
                  e.preventDefault();
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
                          validation.touched.CourseName && validation.errors.CourseName ? true : false
                        }
                      />
                      {validation.touched.CourseName && validation.errors.CourseName ? (
                        <FormFeedback type="invalid">{validation.errors.CourseName}</FormFeedback>
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
                          validation.touched.CourseCategory && validation.errors.CourseCategory ? true : false
                        }
                      />
                      {validation.touched.CourseCategory && validation.errors.CourseCategory ? (
                        <FormFeedback type="invalid">{validation.errors.CourseCategory}</FormFeedback>
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
                        value={
                          validation.values.CourseStatus || ""
                        }
                      >
                        <option>Pending</option>
                        <option>Active</option>
                        <option>Draft</option>
                        <option>Inactive</option>
                      </Input>
                      {validation.touched.CourseStatus && validation.errors.CourseStatus ? (
                        <FormFeedback type="invalid">{validation.errors.CourseStatus}</FormFeedback>
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
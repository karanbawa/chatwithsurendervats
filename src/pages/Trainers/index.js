import React, { useEffect, useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledTooltip,
  Input,
  FormFeedback,
  Label,
  Form,
  Dropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

import DeleteModal from "../../components/Common/DeleteModal";
import {
  getCustomers as onGetCustomers,
  addNewCustomer as onAddNewCustomer,
  updateCustomer as onUpdateCustomer,
  deleteCustomer as onDeleteCustomer,
} from "store/e-commerce/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from '../../components/Common/TableContainer';


// Column
import {
  Name,
  Email,
  Phone,
  JoiningDate,
} from './CustCol';

const Trainers = props => {

  //meta title
  document.title = "Trainers | TWT -Train With Trainer";

  const dispatch = useDispatch();

  const { customers } = useSelector(state => ({ 
    customers: state.ecommerce.customers,
  }));

  const [modal, setModal] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState(null);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (customer && customer.username) || '',
      email: (customer && customer.email) || '',
      phone: (customer && customer.phone) || '',
      password: (customer && customer.password) || '',
      sendEmailToUser: (customer && customer.sendEmailToUser) || '',
      editingOfPublishedCourses: (customer && customer.editingOfPublishedCourses) || '',
      accessToSalesDashboard: (customer && customer.accessToSalesDashboard) || '',
      accessToLearnersDetails: (customer && customer.accessToLearnersDetails) || '',
      accessToLearnersToEnrollCourse: (customer && customer.accessToLearnersToEnrollCourse) || '',
      accessToDownloadCourse: (customer && customer.accessToDownloadCourse) || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      email: Yup.string().matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please Enter Valid Email"
      ).required("Please Enter Your Email"),
      phone: Yup.string().required("Please Enter Your Phone"),
      password: Yup.string()
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,16}$/,
          'Password must have at least one uppercase letter, one numeric digit, one special character, and be 8-16 characters long')
        .required("Please Enter Your Password")
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateTrainer = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          sendEmailToUser: values.sendEmailToUser,
          editingOfPublishedCourses: values.editingOfPublishedCourses,
          accessToSalesDashboard: values.accessToSalesDashboard,
          accessToLearnersDetails: values.accessToLearnersDetails,
          accessToLearnersToEnrollCourse: values.accessToLearnersToEnrollCourse,
          accessToDownloadCourse: values.accessToDownloadCourse
        };
        // update customer
        dispatch(onUpdateCustomer(updateTrainer));
        validation.resetForm();
      } else {
        const newTrainer = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          email: values["email"],
          phone: values["phone"],
          password: values["password"],
          sendEmailToUser: values["sendEmailToUser"],
          editingOfPublishedCourses: values["editingOfPublishedCourses"],
          accessToSalesDashboard: values["accessToSalesDashboard"],
          accessToLearnersDetails: values["accessToLearnersDetails"],
          accessToLearnersToEnrollCourse: values["accessToLearnersToEnrollCourse"],
          accessToDownloadCourse: values["accessToDownloadCourse"]
        };
        // save new customer
        dispatch(onAddNewCustomer(newTrainer));
        validation.resetForm();
      }
      toggle();
    },
  });

  const handleCustomerClick = arg => {
    const customer = arg;

    setCustomer({
      id: customer.id,
      username: customer.username,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      rating: customer.rating,
      walletBalance: customer.walletBalance,
      joiningDate: customer.joiningDate,
    });

    setIsEdit(true);
    toggle();
  };

  // Customber Column
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'username',
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        }
      },
      {
        Header: 'Email',
        accessor: 'email',
        filterable: true,
        Cell: (cellProps) => {
          return <Email {...cellProps} />;
          ;
        }
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        filterable: true,
        Cell: (cellProps) => {
          return <Phone {...cellProps} />;
          ;
        }
      },
      {
        Header: 'Joining Date',
        accessor: 'joiningDate',
        Cell: (cellProps) => {
          return <JoiningDate {...cellProps} />;
        }
      },
      {
        Header: 'Action',
        Cell: (cellProps) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="card-drop">
                <i className="mdi mdi-dots-horizontal font-size-18"></i>
              </DropdownToggle>

              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  onClick={() => {
                    const customerData = cellProps.row.original;
                    handleCustomerClick(customerData);
                  }
                  }
                >
                  <i className="mdi mdi-pencil font-size-16 text-success me-1" id="edittooltip"></i>
                  Edit
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </DropdownItem>

                <DropdownItem
                  onClick={() => {
                    const customerData = cellProps.row.original;
                    onClickDelete(customerData);
                  }}>
                  <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="deletetooltip"></i>
                  Delete
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    Delete
                  </UncontrolledTooltip>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        }
      },
    ],
    []
  );

  const toggle = () => {
    if (modal) {
      setModal(false);
      setCustomer(null);
    } else {
      setModal(true);
    }
  };

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (customer) => {
    setCustomer(customer);
    setDeleteModal(true);
  };

  const handleDeleteCustomer = () => {
    if (customer && customer.id) {
      dispatch(onDeleteCustomer(customer.id));
      setDeleteModal(false);
    }
  };

  useEffect(() => {
    if (customers && !customers.length) {
      dispatch(onGetCustomers());
    }
  }, [dispatch, customers]);

  useEffect(() => {
    setCustomerList(customers);
  }, [customers]);

  useEffect(() => {
    if (!isEmpty(customers)) {
      setCustomerList(customers);
    }
  }, [customers]);

  const handleAddTrainersList = () => {
    setCustomerList("");
    setIsEdit(false);
    toggle();
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCustomer}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Trainers" breadcrumbItem="Trainers" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={customers}
                    isGlobalFilter={true}
                    isAddTrainersList={true}
                    handleAddTrainersList={handleAddTrainersList}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {"Add Trainers"}
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
                              <Label className="form-label">Name <span className="text-danger">*</span></Label>
                              <Input
                                name="name"
                                type="text"
                                placeholder="Insert Name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                                invalid={
                                  validation.touched.name && validation.errors.name ? true : false
                                }
                              />
                              {validation.touched.name && validation.errors.name ? (
                                <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Email Id <span className="text-danger">*</span></Label>
                              <Input
                                name="email"
                                type="email"
                                placeholder="Insert Email Id"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email && validation.errors.email ? true : false
                                }
                              />
                              {validation.touched.email && validation.errors.email ? (
                                <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Phone No <span className="text-danger">*</span></Label>
                              <Input
                                name="phone"
                                type="text"
                                placeholder="Insert Phone No"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone || ""}
                                invalid={
                                  validation.touched.phone && validation.errors.phone ? true : false
                                }
                              />
                              {validation.touched.phone && validation.errors.phone ? (
                                <FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Password <span className="text-danger">*</span></Label>
                              <Input
                                name="password"
                                type="text"
                                placeholder="Insert Password"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.password || ""}
                                invalid={
                                  validation.touched.password && validation.errors.password ? true : false
                                }
                              />
                              {validation.touched.password && validation.errors.password ? (
                                <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <label className="form-label">Send Email To User</label>
                              <Input
                                name="sendEmailToUser"
                                type="checkbox"
                                className="mx-4"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.editingOfPublishedCourses || ""}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Editing of published courses</label>
                              <Input
                                name="editingOfPublishedCourses"
                                type="checkbox"
                                className="mx-4"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.editingOfPublishedCourses || ""}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Access to Sales Dashboard</label>
                              <Input
                                name="accessToSalesDashboard"
                                type="checkbox"
                                className="mx-4"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.accessToSalesDashboard || ""}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Access to Learner Details</label>
                              <Input
                                name="accessToLearnersDetails"
                                type="checkbox"
                                className="mx-4"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.accessToLearnersDetails || ""}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Access to Learner to Enroll Course</label>
                              <Input
                                name="accessToLearnersToEnrollCourse"
                                type="checkbox"
                                className="mx-4"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.accessToLearnersToEnrollCourse || ""}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Access to Download Course</label>
                              <Input
                                name="accessToDownloadCourse"
                                type="checkbox"
                                className="mx-4"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.accessToDownloadCourse || ""}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-customer"
                              >
                                Save
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Trainers.propTypes = {
  customers: PropTypes.array,
  onGetCustomers: PropTypes.func,
  onAddNewCustomer: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
  onUpdateCustomer: PropTypes.func,
};

export default Trainers;

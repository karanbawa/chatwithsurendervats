import { useFormik } from "formik"
import React, { useEffect, useMemo, useState } from "react"
import * as Yup from "yup"
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Button,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  FormFeedback,
} from "reactstrap"

import {
  DiscountCode,
  DiscountPercentage,
  Status,
  AllowRepeat,
} from "./DiscountCol"

import Breadcrumbs from "components/Common/Breadcrumb"
import TableContainer from "components/Common/TableContainer"
import { useDispatch, useSelector } from "react-redux"
import { addDiscount, getDiscount } from "store/discount/actions"
import { Link } from "react-router-dom"
import Select from "react-select"
import { getCourses as onGetCourses } from "store/actions"

function Discount() {
  const [modal, setModal] = useState(false)
  const [courses, setcourses] = useState([])
  const [coursesOptions, setCoursesOptions] = useState([])
  const dispatch = useDispatch()
  const { discounts, coursesAvailable } = useSelector(state => ({
    discounts: state.discounts.discount,
    coursesAvailable: state.ecommerce.courses,
  }))
  useEffect(() => {
    dispatch(getDiscount())
    if (coursesAvailable && !coursesAvailable.length) {
      dispatch(onGetCourses())
    }
  }, [dispatch])
  useEffect(() => {
    setCoursesOption()
  }, [coursesAvailable])

  const setCoursesOption = () => {
    setCoursesOptions(
      coursesAvailable.map(course => {
        return {
          label: course.name,
          value: course._id,
        }
      })
    )
  }

  function handleMulti(e) {
    setcourses(e)
  }
  const handleAllowRepeat = () => {
    console.log("ar")
  }
  const handleStatus = () => {
    console.log("st")
  }
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      discountCode: "",
      discountPercentage: "",
      maximumUsage: "",
      applicableOn: "1",
      allowRepeat: "Yes",
      status: "Yes",
      courses: [],
    },
    validationSchema: Yup.object({
      discountCode: Yup.string().required("Please enter the Discount Id"),
      discountPercentage: Yup.string().required(
        "Please enter the Discount Percentage"
      ),
      maximumUsage: Yup.number().required(
        "Please enter the maximum usage number"
      ),
      allowRepeat: Yup.string().required("Select an option from the dropdown"),
      applicableOn: Yup.number().required("Select an option from the dropdown"),
      status: Yup.string().required("Please select one from the dropdown"),
    }),
    onSubmit: values => {
      coursesPass()
      dispatch(addDiscount(values))
      toggle()
      validation.resetForm()
    },
  })

  const coursesPass = () => {
    for (let i = 0; i < courses.length; i++) {
      validation.values.courses.push(courses[i].value)
    }
  }
  const toggle = () => {
    if (modal) {
      setModal(false)
      //setOrder(null);
    } else {
      setModal(true)
    }
  }
  const handleDiscountsClicks = () => {
    //setOrderList("");
    //setIsEdit(false);
    toggle()
  }

  const columns = useMemo(() => [
    {
      Header: "Discount Code",
      accessor: "discountCode",
      width: "150px",
      style: {
        textAlign: "center",
        width: "10%",
        background: "#0000",
      },
      filterable: true,
      Cell: cellProps => {
        return <DiscountCode {...cellProps} />
      },
    },
    {
      Header: "Discount Percentage",
      accessor: "discountPercentage",
      width: "150px",
      style: {
        textAlign: "center",
        width: "10%",
        background: "#0000",
      },
      filterable: true,
      Cell: cellProps => {
        return <DiscountPercentage {...cellProps} />
      },
    },
    {
      Header: "Allow Repeat",
      accessor: "allowRepeat",
      type: "toggle",
      width: "150px",
      style: {
        textAlign: "center",
        width: "10%",
        background: "#0000",
      },
      filterable: true,
      Cell: cellProps => {
        const cellData = {
          ...cellProps,
          handleAllowRepeats: handleAllowRepeat,
        }
        return <AllowRepeat {...cellData} />
      },
    },
    {
      Header: "Discount Status",
      accessor: "status",
      width: "150px",
      style: {
        textAlign: "center",
        width: "10%",
        background: "#0000",
      },
      filterable: true,
      Cell: cellProps => {
        const cellData = {
          ...cellProps,
          handleStatuses: handleStatus,
        }
        return <Status handleStatuses={handleStatus} />
      },
    },
    {
      Header: "View Details",
      accessor: "view",
      disableFilters: true,
      Cell: () => {
        return (
          <Button
            type="button"
            color="primary"
            className="btn-sm btn-rounded"
            //onClick={toggleViewModal}
          >
            View Details
          </Button>
        )
      },
    },
    {
      Header: "Action",
      accessor: "action",
      disableFilters: true,
      Cell: () => {
        return (
          <div className="d-flex gap-3">
            <Link to="#" className="text-success">
              <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              <UncontrolledTooltip placement="top" target="edittooltip">
                Edit
              </UncontrolledTooltip>
            </Link>
            <Link to="#" className="text-danger">
              <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
              <UncontrolledTooltip placement="top" target="deletetooltip">
                Delete
              </UncontrolledTooltip>
            </Link>
          </div>
        )
      },
    },
  ])
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Discount Coupons" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={discounts}
                    isGlobalFilter={true}
                    isDiscountAddOptions={true}
                    handleDiscountClicks={handleDiscountsClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>Add Discount Coupon</ModalHeader>
            <ModalBody>
              <Form
                name="addDiscount"
                id="addDiscount"
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Discount Id</Label>
                      <Input
                        name="discountCode"
                        type="text"
                        placeholder="Insert Discount Id"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.discountCode || ""}
                        invalid={
                          validation.touched.discountCode &&
                          validation.errors.discountCode
                            ? true
                            : false
                        }
                      />
                      {validation.touched.discountCode &&
                      validation.errors.discountCode ? (
                        <FormFeedback type="invalid">
                          {validation.errors.discountCode}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Discount Percentage</Label>
                      <Input
                        name="discountPercentage"
                        type="text"
                        placeholder="Insert Discount Percentage"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.discountPercentage || ""}
                        invalid={
                          validation.touched.discountPercentage &&
                          validation.errors.discountPercentage
                            ? true
                            : false
                        }
                      />
                      {validation.touched.discountPercentage &&
                      validation.errors.discountPercentage ? (
                        <FormFeedback type="invalid">
                          {validation.errors.discountPercentage}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Maximum Usage </Label>
                      <Input
                        name="maximumUsage"
                        type="text"
                        placeholder="Insert Maximum Usage Limit"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.maximumUsage || ""}
                        invalid={
                          validation.touched.maximumUsage &&
                          validation.errors.maximumUsage
                            ? true
                            : false
                        }
                      />
                      {validation.touched.maximumUsage &&
                      validation.errors.maximumUsage ? (
                        <FormFeedback type="invalid">
                          {validation.errors.maximumUsage}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Applicable On </Label>
                      <Input
                        name="applicableOn"
                        type="select"
                        placeholder="Insert Applicable On "
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.applicableOn}
                        invalid={
                          validation.touched.applicableOn &&
                          validation.errors.applicableOn
                            ? true
                            : false
                        }
                      >
                        <option value="1">All Courses</option>
                        <option value="0">Specific Courses</option>
                      </Input>
                      {validation.touched.applicableOn &&
                      validation.errors.applicableOn ? (
                        <FormFeedback type="invalid">
                          {validation.errors.applicableOn}
                        </FormFeedback>
                      ) : null}
                    </div>
                    {validation.values.applicableOn == 0 ? (
                      <div className="mb-3">
                        <Label className="form-label">
                          Applicable on Courses
                        </Label>
                        <Select
                          placeholder="Insert Applicable On Courses "
                          value={courses}
                          isMulti={true}
                          onChange={e => {
                            handleMulti(e)
                          }}
                          options={coursesOptions}
                          className="select2-selection"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="mb-3">
                      <Label className="form-label">Allow Repeat</Label>
                      <Input
                        name="allowRepeat"
                        type="select"
                        placeholder="Insert Allow Repeat"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.allowRepeat || ""}
                        invalid={
                          validation.touched.allowRepeat &&
                          validation.errors.allowRepeat
                            ? true
                            : false
                        }
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                      {validation.touched.allowRepeat &&
                      validation.errors.allowRepeat ? (
                        <FormFeedback type="invalid">
                          {validation.errors.allowRepeat}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Status</Label>
                      <Input
                        name="status"
                        type="select"
                        placeholder="Insert Status"
                        //className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.status || ""}
                        invalid={
                          validation.touched.status && validation.errors.status
                            ? true
                            : false
                        }
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                      {validation.touched.status && validation.errors.status ? (
                        <FormFeedback type="invalid">
                          {validation.errors.status}
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
                        Save
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default Discount

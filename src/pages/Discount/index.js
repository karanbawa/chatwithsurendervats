import { useFormik } from "formik"
import React, { useEffect, useMemo } from "react"
import * as Yup from "yup"
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Button,
  UncontrolledTooltip,
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
import { getDiscount } from "store/discount/actions"
import { Link } from "react-router-dom"

function Discount() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDiscount())
  }, [])

  const { discounts } = useSelector(state => ({
    discounts: state.discounts.discount,
  }))
  //console.log(discounts)

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
        return <AllowRepeat {...cellProps} />
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
        return <Status {...cellProps} />
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
                    //handleOrderClicks={handleOrderClicks}
                    customPageSize={10}
                    className="custom-header-css"
                   />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default Discount

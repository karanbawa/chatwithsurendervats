import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isEmpty } from "lodash";
import * as Yup from "yup";
import { useFormik } from "formik";

//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import DeleteModal from '../../components/Common/DeleteModal';

import {
  getOrders as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
  deleteOrder as onDeleteOrder,
} from "store/actions";

import {
  OrderId,
  BillingName,
  Date,
  Total,
  PaymentStatus,
  PaymentMethod
}
  from "./InvoiceCol";

//redux
import { useSelector, useDispatch } from "react-redux";
import TransactionModal from "./InvoicesModel";

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
import TableContainer from "components/Common/TableContainer";

function Invoices() {

  //meta title
  document.title = "Transactions | TWT -Train With Trainer";

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState(null);
  const [amountAfterTransactionFee, setAmountAfterTransactionFee] = useState(0);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      amountToWithdraw: '',
      transactionFee: 50,
      finalAmountToWithdraw: '',
    },
    validationSchema: Yup.object({
      amountToWithdraw: Yup.number().min(0, 'Discounted price cannot be less than 0').required("Please Enter the Amount to withdraw"),
      finalAmountToWithdraw: Yup.number().min(0, 'Discounted price cannot be less than 0')
    }),
    onSubmit: (values) => {
        // save new order
        dispatch(onAddNewOrder(newOrder));
        validation.resetForm();
      toggle();
    },
  });


  const toggleViewModal = () => setModal1(!modal1);

  const dispatch = useDispatch();
  const { orders } = useSelector(state => ({
    orders: state.ecommerce.orders,
  }));

  useEffect(() => {
    if (orders && !orders.length) {
      dispatch(onGetOrders());
    }
  }, [dispatch, orders]);

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrderList(orders);
      setIsEdit(false);
    }
  }, [orders]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  };

  const handleOrderClick = arg => {
    const order = arg;
    setOrder({
      id: order.id,
      orderId: order.orderId,
      billingName: order.billingName,
      orderdate: order.orderdate,
      total: order.total,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      badgeclass: order.badgeclass,
    });

    setIsEdit(true);

    toggle();
  };

  //delete order
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (order) => {
    setOrder(order);
    setDeleteModal(true);
  };

  const handleDeleteOrder = () => {
    if (order && order.id) {
      dispatch(onDeleteOrder(order.id));
      setDeleteModal(false);
    }
  };
  const handleWithdrawTransactionClicks = () => {
    setOrderList("");
    setIsEdit(false);
    toggle();
  };

  const columns = useMemo(
    () => [

      {
        Header: 'Invoice ID',
        accessor: 'orderId',
        width: '150px',
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: true,
        Cell: (cellProps) => {
          return <OrderId {...cellProps} />;
        }
      },
      {
        Header: 'Customer Name',
        accessor: 'billingName',
        filterable: true,
        Cell: (cellProps) => {
          return <BillingName {...cellProps} />;
        }
      },
      {
        Header: 'Invoice Date',
        accessor: 'orderdate',
        filterable: true,
        Cell: (cellProps) => {
          return <Date {...cellProps} />;
        }
      },
      {
        Header: 'Amount',
        accessor: 'total',
        filterable: true,
        Cell: (cellProps) => {
          return <Total {...cellProps} />;
        } 
      },
      {
        Header: 'Payment Status',
        accessor: 'paymentStatus',
        filterable: true,
        Cell: (cellProps) => {
          return <PaymentStatus {...cellProps} />;
        } 
      },
      {
        Header: 'Product Type',
        accessor: 'totalName',
        filterable: true,
        Cell: (cellProps) => {
          return <Total {...cellProps} />;
        } 
      }
    ],
    []
  );

  const handleFinalAmountToWithdrawChange = (event) => {
    const amountToWithdraw = event.target.value;
    console.log('amountToWithdraw');
    const amountAfterTransactionFee = amountToWithdraw - validation.values.transactionFee;
    setAmountAfterTransactionFee(amountAfterTransactionFee);
    const finalAmountToWithdraw = (amountAfterTransactionFee * 0.9).toFixed(2); // Apply 10% discount
    validation.setFieldValue('finalAmountToWithdraw', finalAmountToWithdraw);
    validation.handleChange(event);
  };

  return (
    <React.Fragment>
      <TransactionModal isOpen={modal1} toggle={toggleViewModal} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoices" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={orders}
                    isGlobalFilter={true}
                    isAddTransactionOptions={true}
                    balance={0}
                    handleWithdrawTransactionClicks={handleWithdrawTransactionClicks}
                    customPageSize={10}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              Withdraw Money
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
                      <Label className="form-label">Enter Amount to Withdraw</Label>
                      <Input
                        name="amountToWithdraw"
                        type="text"
                        placeholder="Enter Amount To Withdraw"
                        onChange={handleFinalAmountToWithdrawChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.amountToWithdraw || ""}
                        invalid={
                          validation.touched.amountToWithdraw && validation.errors.amountToWithdraw ? true : false
                        }
                      />
                      {validation.touched.amountToWithdraw && validation.errors.amountToWithdraw ? (
                        <FormFeedback type="invalid">{validation.errors.amountToWithdraw}</FormFeedback>
                      ) : null}
                      <label className="d-flex justify-content-end">Amount Balance: {'0'}</label>
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Transaction Fee</Label>
                      <Input
                        name="transactionFee"
                        type="text"
                        placeholder="Transaction Fee"
                        disabled
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.transactionFee || ""}
                      />
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Final Amount To Withdraw</Label>
                      <Input
                        name="finalAmountToWithdraw"
                        type="text"
                        placeholder="Final Amount To Withdraw"
                        disabled
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.finalAmountToWithdraw || ""}
                      />
                     {validation.values.finalAmountToWithdraw <= 0 ? ( 
                     <span className="text-danger">{validation.errors.finalAmountToWithdraw}</span> ) : null }
                      <label className="d-flex justify-content-end">{amountAfterTransactionFee} - 10% TDS</label>
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
                       Submit Request
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
Invoices.propTypes = {
  preGlobalFilteredRows: PropTypes.any,

};


export default Invoices;
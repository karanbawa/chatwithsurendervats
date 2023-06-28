import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";

import classNames from "classnames";

//import action
import { 
  getSubscriptions as onGetSubscriptions,
  getStudents as onGetStudents,
  getVideos as onGetVideos,
  getRevenue as onGetRevenue,
  getRatings as onGetRatings,
  getEarnings as onGetEarnings 
} from "../../store/actions";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";

const Dashboard = props => {

  //meta title
  document.title = "Dashboard | TWT -Train With Trainer";

  const dispatch = useDispatch();

  const { subscriptions } = useSelector(state => ({
    subscriptions: state.Dashboard.subscriptions,
  }));

  const { students } = useSelector(state => ({
    students: state.Dashboard.students,
  }));

  const { videos } = useSelector(state => ({
    videos: state.Dashboard.videos,
  }));

  const { revenue } = useSelector(state => ({
    revenue: state.Dashboard.revenue,
  }));

  const { ratings } = useSelector(state => ({
    ratings: state.Dashboard.ratings,
  }));

  const { earnings } = useSelector(state => ({
    earnings: state.Dashboard.earnings,
  }));

  useEffect(() => {
    dispatch(onGetSubscriptions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetStudents());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetVideos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetRevenue());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetRatings());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetEarnings());
  }, [dispatch]);

  // const reportsA = [
  //   { title: "Total Events Subscriptions", iconClass: "bx bx-calendar-alt", value: subscriptions },
  //   { title: "Total Students", iconClass: "bx bxs-group", value: students },
  //   { title: "Total Video Hosted", iconClass: "bx bx-video-recording", value: videos },
  // ];

  // const reportsB = [
  //   { title: "Total Revenue of Trainer", iconClass: "bx bx-money", value: revenue },
  //   { title: "Overall Rating", iconClass: "bx bx-star", value: ratings },
  //   { title: "Earning", iconClass: "bx bx-credit-card", value: earnings },
  // ];


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            <Col>
              <Row>
                {/* Reports Render */}
                {/* {reportsA.map((report, key) => ( */}
                  <Col md="4"> 
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex flex-row justify-content-evenly align-items-center">
                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + "bx bx-calendar-alt" + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                          <div className="flex-grow-1">
                            <h4 className="fw-medium text-center">
                            Total Subscriptions
                            </h4>
                          </div>
                          <div>  
                            <h4 className="mb-0">{subscriptions}</h4>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                {/* ))} */}
                {/* {reportsA.map((report, key) => ( */}
                  <Col md="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex flex-row justify-content-evenly align-items-center">
                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + "bx bxs-group" + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                          <div className="flex-grow-1">
                            <h4 className="fw-medium text-center">
                            Total Students
                            </h4>
                          </div>
                          <div>  
                            <h4 className="mb-0">{students}</h4>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                {/* ))} */}
                {/* {reportsA.map((report, key) => ( */}
                  <Col md="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex flex-row justify-content-evenly align-items-center">
                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + "bx bx-video-recording" + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                          <div className="flex-grow-1">
                            <h4 className="fw-medium text-center">
                            Total Videos
                            </h4>
                          </div>
                          <div>  
                            <h4 className="mb-0">{videos}</h4>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                {/* ))} */}
              </Row>
              <Row>
              {/* {reportsB.map((report, key) => ( */}
                  <Col md="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex flex-row justify-content-evenly align-items-center">
                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + "bx bx-money" + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                          <div className="flex-grow-1">
                            <h4 className="fw-medium text-center">
                            Total Revenue
                            </h4>
                          </div>
                          <div>  
                            <h4 className="mb-0">{revenue}</h4>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                {/* ))} */}
                {/* {reportsB.map((report, key) => ( */}
                <Col md="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex flex-row justify-content-evenly align-items-center">
                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + "bx bx-star" + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                          <div className="flex-grow-1">
                            <h4 className="fw-medium text-center">
                            Overall Rating
                            </h4>
                          </div>
                          <div>  
                            <h4 className="mb-0">{ratings}</h4>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                {/* ))} */}
                {/* {reportsB.map((report, key) => ( */}
                <Col md="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex flex-row justify-content-evenly align-items-center">
                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + "bx bx-credit-card" + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                          <div className="flex-grow-1">
                            <h4 className="fw-medium text-center">
                            Total Earnings
                            </h4>
                          </div>
                          <div>  
                            <h4 className="mb-0">{earnings}</h4>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                {/* ))} */}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  getSubscriptions: PropTypes.any,
  getStudents: PropTypes.any,
  getVideos: PropTypes.any,
  getRevenue: PropTypes.any,
  getRatings: PropTypes.any,
  getEarnings: PropTypes.any,
  onGetSubscriptions: PropTypes.func,
  onGetStudents: PropTypes.func,
  onGetVideos: PropTypes.func,
  onGetRevenue: PropTypes.func,
  onGetRatings: PropTypes.func,
  onGetEarnings: PropTypes.func,
};

export default withTranslation()(Dashboard);

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardBody, CardTitle, Col, Container, Form, Input, Label, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "store/course/actions";
import Breadcrumbs from "../../components/Common/Breadcrumb";


const AddCourse = () => {
  // const [video, setVideo] = useState(null);
  //const [thumbnail, setThumbnail] = useState(null);
  const dispatch = useDispatch();
  // const answer = useSelector((state) => state.course);
  //console.log(answer);


  const formik = useFormik({
    initialValues: {
      courseName: "",
      courseSummary: "",
      category: "",
      studentMrpPrice: "",
      studentSalePrice: "",
      hardnessLevel: "",
      courseLanguage: "",
      courseType: "",
      courseCertificate: false,
      advice: "",
      objective: "",
      video: null,
      thumbnail: null,
    },
    validationSchema: Yup.object({
      courseName: Yup.string().required("Course Name is required"),
      courseSummary: Yup.string().required("Course Summary is required"),
      category: Yup.string().required("Category is required"),
      studentMrpPrice: Yup.number().required("Price for student [MRP] is required"),
      studentSalePrice: Yup.number().required("Price for student [Sale Price] is required"),
      hardnessLevel: Yup.string().required("Course hardness level is required"),
      courseLanguage: Yup.string().required("Course language is required"),
      courseType: Yup.string().required("Course type is required"),
      advice: Yup.string().max(800, "Max 800 characters allowed"),
      objective: Yup.string().max(1000, "Max 1000 characters allowed"),
      //video: Yup.mixed().required("Preview video is required"),
      //thumbnail: Yup.mixed().required("Course thumbnail is required"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();

    formData.append('courseName', values.courseName);
    formData.append('courseSummary', values.courseSummary);
    formData.append('category', values.category);
    formData.append('studentMrpPrice', values.studentMrpPrice);
    formData.append('studentSalePrice', values.studentSalePrice);
    formData.append('hardnessLevel', values.hardnessLevel);
    formData.append('courseLanguage', values.courseLanguage);
    formData.append('courseType', values.courseType);
    formData.append('courseCertificate', values.courseCertificate);
    formData.append('advice', values.advice);
    formData.append('objective', values.objective);
    formData.append('video', values.video);
    formData.append('thumbnail', values.thumbnail);

      console.log(formData);
      dispatch(addCourse(values))
      // Call API or perform further actions with form values
    },
  });

  return (
    <React.Fragment>
      <div className="page-content ">
        <Container fluid={true}>
        <Breadcrumbs title="ADD COURSE" />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle className="h4">ADD COURSE</CardTitle>

                  <Form onSubmit={formik.handleSubmit}>

                    <Row className="mb-3">
                     
                        <Label  className="col-md-2 col-form-label" htmlFor="courseName">Course Name * </Label>
                        <div className="col-md-10">
                        <Input 
                        className="form-control"
                          type="text"
                          id="courseName"
                          name="courseName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.courseName}
                        />
                     </div>
                    </Row>
                    
                    <Row className="mb-3">
                     
                      <Label className="col-md-2 col-form-label" htmlFor="courseSummary">Course short summary *</Label>
                      <div className="col-md-10">
                      <Input
                      className="form-control"
                        type="text"
                        id="courseSummary"
                        name="courseSummary"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.courseSummary}
                      />

                    </div>
                    </Row>

                    
                    <Row className="mb-3">
                      <Label className="col-md-2 col-form-label" htmlFor="category">Select Category *</Label>
                      <div className="col-md-10">
                      <select
                      className="form-control"
                        id="category"
                        name="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                      >
                        <option value="">Select</option>
                        <option value="Business/Career">Business/Career</option>
                        <option value="Health">Health</option>
                        <option value="Hobbies & Art">Hobbies & Art</option>
                        <option value="Mind">Mind</option>
                        <option value="Money">Money</option>
                        <option value="Relationship">Relationship</option>
                        <option value="Self Help">Self Help</option>
                        <option value="Spiritual">Spiritual</option>
                        <option value="Technical Skills">Technical Skills</option>
                        <option value="Inter Personal Skills">Inter Personal Skills</option>
                      </select>

                    </div>
                    </Row>

                    <Row className="mb-3">
                     
                      <Label  className="col-md-2 col-form-label" htmlFor="studentMrpPrice">Price for student [MRP] *</Label>
                      <div className="col-md-10">
                      <Input
                      className="form-control"
                        type="number"
                        id="studentMrpPrice"
                        name="studentMrpPrice"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.studentMrpPrice}
                      />

                    </div>
                    </Row>

                    <Row className="mb-3">
                      <Label className="col-md-2 col-form-label" htmlFor="studentSalePrice">Price for student [Sale] *</Label>
                      <div className="col-md-10">
                      <Input
                     className="form-control"
                        type="number"
                        id="studentSalePrice"
                        name="studentSalePrice"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.studentSalePrice}
                      />

                    </div>
                    </Row>
                    <Row>
                    
                      
                        <label className="font-size-14 col-md-2 ">Features</label>
                        {/* <Row> */}
                        <Col md={3}>
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="option1"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                          >
                            Beginner
                          </label>
                        </div>
                        </Col>
                        <Col md={3}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios2"
                            value="option2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios2"
                          >
                            Intermediate
                          </label>
                        </div>
                        </Col>
                        <Col md={3}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios2"
                            value="option2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios2"
                          >
                            Advance
                          </label>
                        </div>
                        </Col>
                        {/* </Row> */}
                      
                    
                    
                   
                    
                  </Row>

                    
                    <Row className="mb-3">
                      <label  className="col-md-2 col-form-label" htmlFor="courseLanguage">Course language *</label>
                      <Row className="mb-3"></Row>
                      <select
                      className="form-control"
                        id="courseLanguage"
                        name="courseLanguage"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.courseLanguage}
                      >
                        <option value="">Select</option>
                        <option value="hindi">Hindi</option>
                        <option value="english">English</option>
                      </select>

                      </Row>
                    

                    <div>
                      <div>Course type</div>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name="courseType"
                            value="sequential"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.courseType === "sequential"}
                          />
                          Sequential
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="courseType"
                            value="random"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.courseType === "random"}
                          />
                          Random
                        </label>
                      </div>

                    </div>

                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name="courseCertificate"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.courseCertificate}
                        />
                        Course certificate
                      </label>
                    </div>

                    <div>
                      <label htmlFor="advice">Advice from trainer before you start</label>
                      <textarea
                        id="advice"
                        name="advice"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.advice}
                      ></textarea>

                    </div>

                    <div>
                      <label htmlFor="objective">Objective of the Course</label>
                      <textarea
                        id="objective"
                        name="objective"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.objective}
                      ></textarea>

                    </div>

                    <div>
                      <label htmlFor="video">Preview video button *</label>
                      <input
                        type="file"
                        id="video"
                        name="video"
                        onChange={(event) => {
                          formik.setFieldValue("video", event.currentTarget.files[0]);
                        }}
                      />

                    </div>

                    <div>
                      <label htmlFor="thumbnail">Course thumbnail *</label>
                      <input
                        type="file"
                        id="thumbnail"
                        name="thumbnail"
                        onChange={(event) => {
                          formik.setFieldValue("thumbnail", event.currentTarget.files[0]);
                        }}
                      />

                    </div>

                    <button type="submit">Submit

                    </button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>

      </div>

    </React.Fragment>


  );
};

export default AddCourse;

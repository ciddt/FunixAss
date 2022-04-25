import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  Button,
  Modal,
  Col,
  Form,
  Input,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

// Presentational component render danh sách từng nhân viên
const RenderStaffItem = ({ staff }) => {
  return (
    <Link to={`/staff/${staff.id}`}>
      <Card className="shadow border-warning">
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <CardBody>
          <CardSubtitle>{staff.name}</CardSubtitle>
        </CardBody>
      </Card>
    </Link>
  );
};

// Presentational component (const)
class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameFound: "",
      openModal: false,
      name: "",
      doB: "",
      startDate: "",
      department: "Sale",
      salaryScale: 1,
      annualLeave: 0,
      overTime: 0,
      salary: 3000,
      image: "/assets/image/staffadded.png",
      touched: {
        name: false,
        doB: false,
        startDate: false,
        department: false,
        salaryScale: false,
        annualLeave: false,
        overTime: false
      },
    };
    //Ràng buộc hai chiều
    this.toggleModal = this.toggleModal.bind(this);
    this.searchStaff = this.searchStaff.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  //Bật tắt modal
  toggleModal() {
    this.setState({
      openModal: !this.state.openModal,
    });
  }

  //Xử lý tìm kiếm nhân viên theo từ khóa
  searchStaff(event) {
    const searchName = event.target.searchName.value;
    event.preventDefault();
    this.setState({ nameFound: searchName });
  }

  //Xử lý touched trả về true khi dữ liệu được nhập
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  //Set thay đổi state khi dữ liệu được nhập
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  //Xử lý dữ liệu được submit
  handleSubmit = () => {
    const newStaff = {
      name: this.state.name,
      doB: this.state.doB,
      startDate: this.state.startDate,
      department: this.state.department,
      salaryScale: this.state.salaryScale,
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: this.state.image,
    };
    this.props.onAdd(newStaff);
  };

  //Check ngày tháng có bỏ trống không
  validate(
    name,
    doB,
    startDate,
    department,
    salaryScale,
    annualLeave,
    overTime
  ) {
    const errors = {
      name: "",
      doB: "",
      startDate: "",
      department: "",
      salaryScale: "",
      annualLeave: "",
      overTime: ""
    };

    if (this.state.touched.name && name.length < 3)
      errors.name = "nhập nhiều hơn 3 ký tự."
    if (this.state.touched.name && name.length > 30)
      errors.name = "Nhập ít hơn 30 ký tự."
    if (this.state.touched.doB && doB.length < 1)
      errors.doB = "Không được bỏ trống"
    if (this.state.touched.startDate && startDate.length < 1)
      errors.startDate = "Không được bỏ trống"
    const reg = /^\d+$/;
    if (this.state.touched.salaryScale && !reg.test(salaryScale))
      errors.salaryScale = "Yêu cầu phải là số"
    if (this.state.touched.annualLeave && !reg.test(annualLeave))
      errors.annualLeave = "Yêu cầu phải là số"
    if (this.state.touched.overTime && !reg.test(overTime))
      errors.overTime = "Yêu cầu phải là số"
    return errors;
  }

  render() {
    // Tạo biến báo lỗi khi người dùng khai báo thiếu
    const errors = this.validate(
      this.state.name,
      this.state.doB,
      this.state.startDate,
      this.state.department,
      this.state.salaryScale,
      this.state.annualLeave,
      this.state.overTime
    );
    const staffList = this.props.staffs
      .filter((val) => {
        if (this.state.nameFound === "") return val;
        else if (
          val.name.toLowerCase().includes(this.state.nameFound.toLowerCase())
        )
          return val;
        return 0;
      })
      .map((val) => {
        return (
          <div className="col-6 col-md-4 col-lg-2 mt-3 mb-3" key={val.id}>
            <RenderStaffItem staff={val} />
          </div>
        );
      });

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mt-3">
            <div className="row">
              <div className="col-10 col-md-10">
                <h3>Nhân viên</h3>
              </div>
              <div className="col-2 col-auto">
                <Button outline onClick={this.toggleModal}>
                  <span className="fa fa-plus fa-lg"></span>
                </Button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-3">
            <form onSubmit={this.searchStaff} className="form-group row">
              <div className="col-8 col-md-8">
                <input
                  type="text"
                  name="searchName"
                  className="form-control"
                  placeholder="Tìm kiếm nhân viên ..."
                />
              </div>
              <div className="col-4 col-md-4">
                <button className="btn btn-success" type="submit">
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-12">
          <hr />
        </div>
        <Modal
          isOpen={this.state.openModal}
          toggle={this.toggleModal}
          className="shadow"
        >
          <ModalHeader
            toggle={this.toggleModal}
            className="bg-success text-white"
          >
            THÊM NHÂN VIÊN
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <Row className="control-group mb-1">
                <Label htmlFor=".name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={this.state.name}
                    valid={errors.name === ""}
                    invalid={errors.name !== ""}
                    onBlur={this.handleBlur("name")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group mb-1">
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    name="doB"
                    id="doB"
                    valid={errors.doB === ""}
                    invalid={errors.doB !== ""}
                    onBlur={this.handleBlur("doB")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.doB}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group mb-1">
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    valid={errors.startDate === ""}
                    invalid={errors.startDate !== ""}
                    onBlur={this.handleBlur("startDate")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.startDate}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group mb-1">
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Input
                    type="select"
                    name="department"
                    id="department"
                    value={this.state.department}
                    valid={errors.department === ""}
                    invalid={errors.department !== ""}
                    onBlur={this.handleBlur("department")}
                    onChange={this.handleInputChange}
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Input>
                  <FormFeedback>{errors.department}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group mb-1">
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Input
                    type="number"
                    className="form-control"
                    id="salaryScale"
                    name="salaryScale"
                    value={this.state.salaryScale}
                    valid={errors.salaryScale === ""}
                    invalid={errors.salaryScale !== ""}
                    onBlur={this.handleBlur("salaryScale")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.salaryScale}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group mb-1">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Input
                    type="number"
                    className="form-control"
                    id="annualLeave"
                    name="annualLeave"
                    value={this.state.annualLeave}
                    valid={errors.annualLeave === ""}
                    invalid={errors.annualLeave !== ""}
                    onBlur={this.handleBlur("annualLeave")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.annualLeave}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group mb-1">
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Input
                    type="number"
                    className="form-control"
                    id="overTime"
                    name="overTime"
                    value={this.state.overTime}
                    valid={errors.overTime === ""}
                    invalid={errors.overTime !== ""}
                    onBlur={this.handleBlur("overTime")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.overTime}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group mb-1">
                <Col>
                  <Button type="submit" color="success" className="col-12">
                    Thêm
                  </Button>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>

        <div className="row shadow mb-5 mt-5">{staffList}</div>
      </div>
    );
  }
}

export default StaffList;

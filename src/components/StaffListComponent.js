import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  Button,
  Modal,
  Col,
  Input,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

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
      doB: "",
      startDate: "",
      touched: {
        doB: false,
        startDate: false,
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
  handleSubmit = (value) => {
    const newStaff = {
      name: value.name,
      doB: value.doB,
      startDate: value.startDate,
      department: value.department,
      salaryScale: value.salaryScale,
      annualLeave: value.annualLeave,
      overTime: value.overTime,
      image: "/assets/image/staffadded.png",
    };
    this.props.onAdd(newStaff);
  };

  //Check ngày tháng có bỏ trống không
  validate(doB, startDate) {
    const errors = {
      doB: "",
      startDate: "",
    };

    if (this.state.touched.doB && doB.length < 1)
      errors.doB = "Không được bỏ trống.";
    if (this.state.touched.startDate && startDate.length < 1)
      errors.startDate = "Không được bỏ trống.";

    return errors;
  }

  render() {
    // Tạo biến báo lỗi khi người dùng khai báo thiếu
    const errors = this.validate(this.state.doB, this.state.startDate);
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
            <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
              <Row className="control-group mb-1">
                <Label htmlFor="name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    className="form-control"
                    id="name"
                    name="name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(30),
                    }}
                  />
                  <Errors
                    model=".name"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Không được bỏ trống. ",
                      minLength: "Hãy nhập nhiều hơn 3 ký tự",
                      maxLength: "Hãy nhập ít hơn 30 ký tự",
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group mb-1">
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Control.text
                      type="date"
                      model=".doB"
                      className="form-control"
                      id="doB"
                      name="doB"
                      validators={{
                        required
                      }}
                    />
                    <Errors
                      model=".doB"
                      className="text-danger"
                      show="touched"
                      messages={{
                        required: "Không được bỏ trống."
                      }}
                    />
                </Col>
              </Row>
              <Row className="control-group mb-1">
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                    <Control.text
                      type="date"
                      model=".startDate"
                      className="form-control"
                      id="startDate"
                      name="startDate"
                      validators={{
                        required
                      }}
                    />
                    <Errors
                      model=".startDate"
                      className="text-danger"
                      show="touched"
                      messages={{
                        required: "Không được bỏ trống."
                      }}
                    />
                </Col>
              </Row>
              <Row className="control-group mb-1">
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Control.select
                    model=".department"
                    name="department"
                    id="department"
                    className="form-control"
                    defaultValue="Sale"
                  >
                    <option value="Sale">Sale</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="control-group mb-1">
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".salaryScale"
                    id="salaryScale"
                    name="salaryScale"
                    placeholder="1.0 -> 3.0"
                    validators={{
                      required,
                      isNumber,
                    }}
                    defaultValue="1"
                    className="form-control"
                  />
                  <Errors
                    model=".salaryScale"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Không được bỏ trống.",
                      isNumber: "Yêu cầu phải là số.",
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group mb-1">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    defaultValue="0"
                    validators={{
                      required,
                      isNumber,
                    }}
                    className="form-control"
                  />
                  <Errors
                    model=".annualLeave"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Không được bỏ trống.",
                      isNumber: "Yêu cầu phải là số.",
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group mb-1">
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".overTime"
                    id="overTime"
                    name="overTime"
                    defaultValue="0"
                    validators={{
                      required,
                      isNumber,
                    }}
                    className="form-control"
                  />
                  <Errors
                    model=".overTime"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Không được bỏ trống.",
                      isNumber: "Yêu cầu phải là số.",
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group mb-1">
                <Col>
                  <Button type="submit" color="success" className="col-12">
                    Thêm
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>

        <div className="row shadow mb-5 mt-5">{staffList}</div>
      </div>
    );
  }
}

export default StaffList;

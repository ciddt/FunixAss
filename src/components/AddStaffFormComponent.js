import React, { Component } from "react";
import { Col, Row, Label, Button } from "reactstrap";
import { Control, Errors, Form } from "react-redux-form";

//Condition for validator
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

class AddStaffForm extends Component {
  //only submit form when value of name, doB, startDate is right
  handleAddForm(value) {
    if (value.name && value.doB && value.startDate) {
      let doB = new Date(value.doB).toISOString();
      let startDate = new Date(value.startDate).toISOString();
      let salaryScale = Number(value.salaryScale);
      let annualLeave = Number(value.annualLeave);
      let overTime = Number(value.overTime);
      let salary = 3000000 * salaryScale + 200000 * overTime;

      const newStaff = {
        name: value.name,
        doB: doB,
        // If chose department, return departmentId: value.department, if not: chose default value is Dept01: Sale
        departmentId: value.department ? value.department : "Dept01",
        startDate: startDate,
        salaryScale: salaryScale,
        annualLeave: annualLeave,
        overTime: overTime,
        image: "/assets/images/staffAdded.png",
        salary: salary,
      };

      console.log(newStaff);
      this.props.postNewStaff(newStaff);
      this.props.resetAddStaffForm();
      this.props.toggleModal();
    }
  }

  render() {
    return (
      <Form model="newStaff" onSubmit={(value) => this.handleAddForm(value)}>
        <Row className="form-group">
          <Label htmlFor="name" md={4}>
            Họ và tên
          </Label>
          <Col md={8}>
            <Control.text
              model=".name"
              id="name"
              name="name"
              className="form-control"
              validators={{
                required,
                minLength: minLength(2),
                maxLength: maxLength(30),
              }}
            />
            <Errors
              className="text-danger"
              model=".name"
              show="touched"
              messages={{
                required: "Không được để trống. ",
                minLength: "Hãy nhập nhiều hơn 2 ký tự",
                maxLength: "Hãy cầu nhập ít hơn 30 ký tự",
              }}
            />
          </Col>
        </Row>
        <Row className="form-group">
          <Label htmlFor="doB" md={4}>
            Ngày sinh
          </Label>
          <Col md={8}>
            <Control.input
              model=".doB"
              type="date"
              id="doB"
              name="doB"
              className="form-control"
              validators={{
                required,
              }}
            />
            <Errors
              className="text-danger"
              model=".doB"
              show="touched"
              messages={{
                required: "Bạn chưa nhập ngày sinh",
              }}
            />
          </Col>
        </Row>
        <Row className="form-group">
          <Label htmlFor="startDate" md={4}>
            Ngày vào công ty
          </Label>
          <Col md={8}>
            <Control.input
              model=".startDate"
              type="date"
              id="startDate"
              name="startDate"
              className="form-control"
              validators={{
                required,
              }}
            />
            <Errors
              className="text-danger"
              model=".startDate"
              show="touched"
              messages={{
                required: "Bạn chưa nhập ngày vào công ty",
              }}
            />
          </Col>
        </Row>
        <Row className="form-group">
          <Label htmlFor="department" md={4}>
            Phòng ban
          </Label>
          <Col md={8}>
            <Control.select
              model=".department"
              id="department"
              name="department"
              className="form-control"
            >
              <option value="Dept01">Sale</option>
              <option value="Dept02">HR</option>
              <option value="Dept03">Marketing</option>
              <option value="Dept04">IT</option>
              <option value="Dept05">Finance</option>
            </Control.select>
          </Col>
        </Row>
        <Row className="form-group">
          <Label htmlFor="salaryScale" md={4}>
            Hệ số lương
          </Label>
          <Col md={8}>
            <Control.text
              model=".salaryScale"
              id="salaryScale"
              name="salaryScale"
              className="form-control"
              validators={{
                isNumber,
              }}
            />
            <Errors
              className="text-danger"
              model=".salaryScale"
              show="touched"
              messages={{
                isNumber: "Yêu cầu nhập số",
              }}
            />
          </Col>
        </Row>
        <Row className="form-group">
          <Label htmlFor="annualLeave" md={4}>
            Số ngày nghỉ còn lại
          </Label>
          <Col md={8}>
            <Control.text
              model=".annualLeave"
              id="annualLeave"
              name="annualLeave"
              className="form-control"
              validators={{
                isNumber,
              }}
            />
            <Errors
              className="text-danger"
              model=".annualLeave"
              show="touched"
              messages={{
                isNumber: "Yêu cầu nhập số",
              }}
            />
          </Col>
        </Row>
        <Row className="form-group">
          <Label htmlFor="overTime" md={4}>
            Số ngày đã làm thêm
          </Label>
          <Col md={8}>
            <Control.text
              model=".overTime"
              id="overTime"
              name="overTime"
              className="form-control"
              validators={{
                isNumber,
              }}
            />
            <Errors
              className="text-danger"
              model=".overTime"
              show="touched"
              messages={{
                isNumber: "Yêu cầu nhập số",
              }}
            />
          </Col>
        </Row>
        <Row className="form-group">
          <Col md={{ size: 8, offset: 4 }}>
            <Button type="submit" className="btn-warning">
              Thêm Nhân Viên
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default AddStaffForm;

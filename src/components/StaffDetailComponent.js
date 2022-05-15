import React, { Component } from "react";
import {
  Media,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Fade } from "react-animation-components";
import { Loading } from "./LoadingComponent";

function RenderStaff({ staff, departments }) {
  //For render department name when add new staff
  let departmentStaff = "";
  departments.forEach((department) => {
    if (staff.departmentId === department.id) {
      departmentStaff = department.name;
    }
  });

  return (
    <div className="col-12 m-1">
      <Fade in>
        <Media tag="li">
          <Media left middle>
            <Media
              object
              src={staff.image}
              alt={staff.name}
              className="img-staff"
            />
          </Media>
          <Media body className="ml-5">
            <Media heading>Họ và tên: {staff.name}</Media>
            <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
            <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
            <p>Phòng ban: {departmentStaff}</p>
            <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
            <p>Số giờ đã làm thêm: {staff.overTime}</p>
          </Media>
        </Media>
      </Fade>
    </div>
  );
}

class StaffDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isOpenModal: false,
      // isDeleteStaff: false,
      doB: this.props.staff ? this.props.staff.doB : null,
      startDate: this.props.staff ? this.props.staff.startDate : null,
    };
  }

  render() {
    if (this.props.staff != null) {
      return (
        <div className="container mb-3">
          <div className="row">
            <Breadcrumb className="my-1">
              <BreadcrumbItem>
                <Link to="/staffs">Nhân Viên</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{this.props.staff.name}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="row">
            <RenderStaff
              staff={this.props.staff}
              departments={this.props.departments}
            />
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default StaffDetail;

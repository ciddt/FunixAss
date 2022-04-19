import React, { Component } from "react";
import { Card, CardImg, CardBody, CardSubtitle, Button, Modal, Col, Input, ModalHeader, ModalBody, Row, Label, FormFeedback } from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

// Presentational component để Render danh sách từng nhân viên
const RenderStaffItem = ({ staff }) => {
  return (
    <Link to={`/staff/${staff.id}`}>
      <Card>
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <CardBody>
          <CardSubtitle>{staff.name}</CardSubtitle>
        </CardBody>
      </Card>
    </Link>
  );
};


class StaffList extends Component {

  render() {
    const staffList = this.props.staffs
      .map((val) => {
        return (
          <div className="col-6 col-md-4 col-lg-2 mt-3 mb-3" key={val.id}>
            <RenderStaffItem staff={val} />
          </div>
        );
      });

    //Render giao diện Staff list
    return (
      <div className="container">
        <div className="row shadow mb-5 mt-5">{staffList}</div>
      </div>
    );
  }
}

export default StaffList;
import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

function RenderStaff({ staff }) {
  if (staff != null) {
    return (
      <div className="card mb-3 border-warning shadow p-3">
        <div className="row g-0 mb-2 mt-2">
          <div className="col-md-4 text-center">
            <img
              src={staff.image}
              className="img-fluid rounded"
              alt={staff.name}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title text-center">
                Họ và tên: {staff.name}
              </h5>
              <hr />
              <p className="card-text">
                Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
              </p>
              <p className="card-text">
                Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
              </p>
              <p className="card-text">Phòng ban: {staff.department.name || staff.department}</p>
              <p className="card-text">
                Số ngày nghỉ còn lại: {staff.annualLeave}
              </p>
              <p className="card-text">Số ngày đã làm thêm: {staff.overTime}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const StaffDetail = (props) => {
  if (props.staff != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staff">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3 className="text-primary">{props.staff.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row mb-3">
          <RenderStaff staff={props.staff} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default StaffDetail;

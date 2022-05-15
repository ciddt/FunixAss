import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, CardText, Breadcrumb, BreadcrumbItem, CardTitle,
        Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

//Express component render SalaryItem
function RenderSalaryItem({ staff, basicSalary, overTimeSalary }) {
  return (
      <Card>
        <CardHeader className="text-center bg-warning">
          <Link to={`/staffs/${staff.id}`}>
            <CardTitle tag="h4">{staff.name}</CardTitle>
          </Link>
        </CardHeader>
        <CardBody>
          <CardText>Mã nhân viên: {staff.id}</CardText>
          <CardText>Hệ số lương: {staff.salaryScale}</CardText>
          <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
        </CardBody>
        <CardFooter className="text-center">
          {/* toLocaleString('vi-VN') to add . to number */}
          <CardTitle>Lương: {(parseInt((basicSalary*staff.salaryScale + overTimeSalary*staff.overTime),10)).toLocaleString("vi-VN")}
          </CardTitle>
        </CardFooter>
      </Card>
  );
}

class SalaryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: "StaffId",
      basicSalary: 3000000,
      overTimeSalary: 200000,
    }

    this.staffs = JSON.parse(JSON.stringify(this.props.staffs));
  }

  componentDidMount() {
    this.props.fetchSalary()
  }

  //reset state
  setSortBy(sortBy) {
    this.setState({sortBy: sortBy});
  }

  sortStaffItem(sortBy) {
    const staffs = this.staffs;
    switch(sortBy) {
      // Sort staffId from Z-A
      case 'StaffIdReverse' : {
        staffs.sort((staff1, staff2) => staff2.id - staff1.id);
        break;
      }

      //Sort salaryScale from a-z
      case 'StaffSalary' : {
        staffs.sort((staff1, staff2) => {
          let staffSalary1 = this.state.basicSalary*staff1.salaryScale + this.state.overTimeSalary*staff1.overTime
          let staffSalary2 = this.state.basicSalary*staff2.salaryScale + this.state.overTimeSalary*staff2.overTime
          if (staffSalary1 < staffSalary2) {return -1};
          if (staffSalary1 > staffSalary2) {return 1};
          return 0;
        });
        break;
      }

      //Sort salaryScale from a-z
      case 'StaffSalaryReverse' : {
        staffs.sort((staff1, staff2) => {
          let staffSalary1 = this.state.basicSalary*staff1.salaryScale + this.state.overTimeSalary*staff1.overTime
          let staffSalary2 = this.state.basicSalary*staff2.salaryScale + this.state.overTimeSalary*staff2.overTime
          if (staffSalary1 > staffSalary2) {return -1};
          if (staffSalary1 < staffSalary2) {return 1};
          return 0;
        });
        break;
      }

      //Default value is sorting by staffId 
      default : {
        staffs.sort((staff1, staff2) => staff1.id - staff2.id);
        break;
      }
    }
  }

  render() {
    this.staffs = JSON.parse(JSON.stringify(this.props.staffs));
    this.sortStaffItem(this.state.sortBy);

    const salaryList = this.props.salaryLoading ? <Loading /> :
      this.props.salaryErrMess ? <h4>{this.props.salaryErrMess}</h4> :
      this.staffs.map((staff) => {
        return (
          <div key={staff.id} className="col-12 col-md-6 col-lg-4 my-1">
            <RenderSalaryItem staff={staff} basicSalary={this.state.basicSalary} overTimeSalary={this.state.overTimeSalary}/>
          </div>
        );
      });
  
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb className="breadcrumb-arrow my-1">
            <BreadcrumbItem><Link to="/staffs">Nhân Viên</Link></BreadcrumbItem>
            <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row">
          <div className="col-12">
            <h3>Bảng Lương</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p><span className="font-weight-bold">Lương cơ bản: </span>{this.state.basicSalary.toLocaleString("vi-VN")}</p>
            <p><span className="font-weight-bold">Lương giờ làm thêm: </span>{this.state.overTimeSalary.toLocaleString("vi-VN")}</p>
            <hr />
          </div>
        </div>
        <div className="row">
        <Form inline className="col-12 mb-2">
              <FormGroup>
                <Label className="mr-2">
                  Sắp xếp:
                </Label>
              </FormGroup>
              <FormGroup>
                <Input
                  id="sortStaff"
                  type="select"
                  onChange={() => {
                    let sortBy = document.getElementById("sortStaff").value;
                    return this.setSortBy(sortBy);
                  }}
                >
                  <option>Sắp Xếp Theo ...</option>
                  <option value="StaffId">Mã nhân viên A-Z</option>
                  <option value="StaffIdReverse">Mã nhân viên Z-A</option>
                  <option value="StaffSalary">Lương tăng dần</option>
                  <option value="StaffSalaryReverse">Lương giảm dần</option>
                </Input>
              </FormGroup>
            </Form>
        </div>
        <div className="row">
          {salaryList}
        </div>
      </div>
    );
  }
}

export default SalaryList;
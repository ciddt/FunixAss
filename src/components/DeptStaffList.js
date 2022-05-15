import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Loading } from './LoadingComponent';
import StaffList, { RenderStaffItem } from './StaffListComponent';

class DeptStaffList extends Component {
  //When component was mounted, call fetchDeptStaffs()
  componentDidMount() {
    this.props.fetchDeptStaffs(this.props.deptId)
  }

  render() {
    let departmentName = '';
    this.props.departments.forEach(department => {
      if(this.props.deptId === department.id) {
        departmentName = department.name;
      }
    })

    const staffsList = this.props.staffsLoading ? <Loading /> : 
      this.props.staffsErrMess ? <h4>{this.props.staffsErrMess}</h4> :
      this.props.staffs.map((staff) => {
        return (
          <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-1">
            <RenderStaffItem staff={staff}/>
          </div>
        );
      });

    return(
        <div className="container">
          <div className="row">
            <Breadcrumb className="my-1">
              <BreadcrumbItem><Link to="/departments">Phòng Ban</Link></BreadcrumbItem>
              <BreadcrumbItem active>{departmentName}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="row">
            <div className="col-12">
              <h3>{departmentName} - Nhân Viên</h3>
              <hr />
            </div>
          </div>
          <div className="row mb-3">
            {staffsList}
          </div>
        </div>
    );
  }
}

export default DeptStaffList;
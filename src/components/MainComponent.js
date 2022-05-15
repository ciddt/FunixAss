import React, { Component } from "react";
import { Switch, Route, Redirect, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchStaffs,
  fetchDepartments,
  fetchDeptStaffs,
  fetchSalary
} from "../redux/actions/ActionCreators";

import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffList, { RenderStaffItem } from "./StaffListComponent";
import StaffDetail from "./StaffDetailComponent";
import DepartmentList from "./DepartmentListComponent";
import DeptStaffList from "./DeptStaffList";
import SalaryList from "./SalaryComponent";

// map state and dispatch to props and save them
const mapStateToProps = (state) => ({
  staffs: state.staffs,
  departments: state.departments,
  deptStaffs: state.deptStaffs,
  salary: state.salary,
});

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  fetchSalary: () => {
    dispatch(fetchSalary());
  },
  fetchDeptStaffs: (deptId) => {
    dispatch(fetchDeptStaffs(deptId));
  }
});

class Main extends Component {
  //When component mouted, call fetch function
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
  }

  render() {
    //Render Staff List with Search Key
    const SearchStaffList = ({ match }) => {
      let searchRegExp = new RegExp(`${match.params.staffName}`, "gi");
      const staffs = this.props.staffs.staffs.filter((staff) => {
        return searchRegExp.test(staff.name);
      });

      if (staffs.length === 0) {
        return (
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h5>
                  <Link to="/staffs">Back Home</Link>
                </h5>
                <h4 className="my-5 text-center">Cannot found the data ...</h4>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="container">
            <div className="row">
              <div class="col-12">
                <h4>Result:</h4>
              </div>
            </div>
            <div className="row">
              {staffs.map((staff) => {
                return (
                  <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-3">
                    <RenderStaffItem staff={staff} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/staffs"
            render={() => (
              <StaffList
                staffs={this.props.staffs.staffs}
                staffsLoading={this.props.staffs.isLoading}
                staffsErrMess={this.props.staffs.errMess}
                departments={this.props.departments.departments}
              />
            )}
          />
          <Route
            path="/staffs/:staffId"
            render={({ match }) => {
              return (
                <StaffDetail
                  staff={
                    this.props.staffs.staffs.filter(
                      (staff) => staff.id === parseInt(match.params.staffId, 10)
                    )[0]
                  }
                  departments={this.props.departments.departments}
                />
              );
            }}
          />
          <Route path="/search/:staffName" component={SearchStaffList} />
          <Route
            exact
            path="/departments"
            render={() => (
              <DepartmentList
                departments={this.props.departments.departments}
                departmentsLoading={this.props.departments.isLoading}
                departmentsErrMess={this.props.departments.errMess}
                fetchDepartments={this.props.fetchDepartments}
              />
            )}
          />
          <Route
            path="/departments/:deptId"
            render={({ match }) => (
              <DeptStaffList
                deptId={match.params.deptId}
                fetchDeptStaffs={this.props.fetchDeptStaffs}
                staffs={this.props.deptStaffs.deptStaffs}
                staffsLoading={this.props.deptStaffs.isLoading}
                staffsErrMess={this.props.deptStaffs.errMess}
                departments={this.props.departments.departments}
              />
            )}
          />
          <Route
            exact
            path="/salary"
            render={() => (
              <SalaryList
                fetchSalary={this.props.fetchSalary}
                staffs={this.props.salary.salary}
                salaryLoading={this.props.salary.isLoading}
                salaryErrMess={this.props.salary.errMess}
              />
            )}
          />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

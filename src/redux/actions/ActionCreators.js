import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

//Fetch staffs from baseUrl
export const fetchStaffs = () => (dispatch) => {
  //staffLoading when processing of fetching
  dispatch(staffsLoading(true));

  //return json() and dispatch addStaff if success, if not catch error and return errMess
  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errMess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errMess,
});

//Fetch department from baseUrl
export const fetchDepartments = () => (dispatch) => {
  dispatch(departmentsLoading(true));
  return fetch(baseUrl + "departments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((departments) => dispatch(addDepartments(departments)))
    .catch((error) => dispatch(departmentsFailed(error.message)));
};

export const addDepartments = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments,
});

export const departmentsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING,
});

export const departmentsFailed = (errMess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errMess,
});

//Fetch staff of a department
export const fetchDeptStaffs = (deptId) => (dispatch) => {
  dispatch(deptStaffsLoading(true));

  return fetch(baseUrl + "departments/" + deptId)
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((staffs) => dispatch(addDeptStaffs(staffs)))
    .catch((error) => dispatch(deptStaffsFailed(error.message)));
};

export const addDeptStaffs = (staffs) => ({
  type: ActionTypes.ADD_DEPTSTAFFS,
  payload: staffs,
});

export const deptStaffsLoading = () => ({
  type: ActionTypes.DEPTSTAFFS_LOADING,
});

export const deptStaffsFailed = (errMess) => ({
  type: ActionTypes.DEPTSTAFFS_FAILED,
  payload: errMess,
});

//Fetch salary from baseUrl
export const fetchSalary = () => (dispatch) => {
  dispatch(salaryLoading(true));

  return fetch(baseUrl + "staffsSalary")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((salary) => dispatch(addSalary(salary)))
    .catch((error) => dispatch(salaryFailed(error.message)));
};

export const addSalary = (salary) => ({
  type: ActionTypes.ADD_SALARY,
  payload: salary,
});

export const salaryLoading = () => ({
  type: ActionTypes.SALARY_LOADING,
});

export const salaryFailed = (errMess) => ({
  type: ActionTypes.SALARY_FAILED,
  payload: errMess,
});


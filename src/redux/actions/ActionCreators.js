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

//Post Staff to Server
export const postNewStaff = (newStaff) => (dispatch) => {
  //
  return fetch(baseUrl + "staffs", {
    method: "POST",
    body: JSON.stringify(newStaff),
    headers: {
      "Content-Type": "application/json",
    },
    //Send user credentials (cookies, basic http auth, etc..) if the URL is on the same origin as the calling script. This is the default value.
    credentials: "same-origin",
  })
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
    .then((newStaff) => {
      dispatch(addStaffs(newStaff));
    })
    .catch((error) => {
      alert("Cannot add new staff ....\nError: " + error.message);
    });
};

export const addNewStaff = (newStaff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: newStaff,
});

// Patch to Update Staff Info
export const patchUpdateStaff = (updatedStaff) => (dispatch) => {
  return fetch(baseUrl + "staffs", {
    method: "PATCH",
    body: JSON.stringify(updatedStaff),
    headers: {
      "Content-Type": "application/json",
    },
  })
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
    .then((updatedStaffsList) => dispatch(addStaffs(updatedStaffsList)))
    .catch((error) => {
      alert("Cannot update data ....\nError: " + error.message);
    });
};

//Delete Selected Staff
export const deleteStaff = (staffId) => (dispatch) => {
  return fetch(baseUrl + "staffs/" + staffId, {
    method: "DELETE",
  })
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
    .then((deletedStaffsList) => dispatch(addStaffs(deletedStaffsList)))
    .catch((error) =>
      alert("Cannot delete staff ....\nError: " + error.message)
    );
};

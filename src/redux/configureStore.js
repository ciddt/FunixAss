import { createStore, combineReducers, applyMiddleware } from "redux";
import { createForms } from "react-redux-form";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Staffs } from "./reducers/staffs";
import { Departments } from "./reducers/departments";
import { InitialNewStaff } from "./forms";
import { DeptStaffs } from "./reducers/deptstaffs";
import { Salary } from "./reducers/salary";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      deptStaffs: DeptStaffs,
      salary: Salary,
      ...createForms({
        newStaff: InitialNewStaff,
      }),
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};

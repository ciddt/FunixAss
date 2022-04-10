import React, { Component } from "react";
import Header from "./HeaderComponent";
import StaffList from "./StaffListComponent";
import StaffDetail from "./StaffDetailComponent";
import Department from "./DepartmentComponent";
import Salary from "./SalaryComponent";
import Footer from "./FooterComponent";
import { STAFFS, DEPARTMENTS } from "../shared/staffs";
import { Navigate, Route, Routes, useParams } from "react-router-dom";

function StaffWithId({staffs}) {
    // Trong phiên bản react 17 không support phương thức match nên phải sử dụng sang phương thức userParams
    // Lúc này sử dụng phương thức Number thay vì paresint()
    const {staffId} = useParams();
    return (
        <StaffDetail
            staff={staffs.filter((staff) => staff.id === Number(staffId))[0]}
        />
    )
}

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            staffs: STAFFS,
            department: DEPARTMENTS,
        }
    }
    // React 17 không support Switch và Redirect nên chuyển qua Routes và Navigate, route cũng sử dụng element thay vì component
    render() {
        return (
            <>
                <Header/>
                <Routes>
                    <Route 
                        path="/staff" 
                        element={<StaffList staffs = {this.state.staffs}/>}
                    />
                    <Route 
                        path="/staff/:staffId" 
                        element={<StaffWithId staffs = {this.state.staffs}/>}
                    />
                    <Route 
                        path="/department" 
                        element={<Department departments = {this.state.department}/>}
                    />
                    <Route 
                        path="/salary" 
                        element={<Salary staffs = {this.state.staffs}/>}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/staff"/>}
                    />
                </Routes>
                <Footer/>
            </>
        )
    }
}

export default Main;
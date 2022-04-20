import React, { Component } from "react";
import Header from "./HeaderComponent";
import StaffList from "./StaffListComponent";
import Footer from "./FooterComponent";
import { STAFFS, DEPARTMENTS } from "../shared/staffs";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
    constructor (props) {
        super(props);
        this.state = {
            staffs: STAFFS,
            departments: DEPARTMENTS
        }
    }

    render () {
        const addStaff = (staff) => {
            // Tạo id random để không bị trùng nhau
            const id = Math.floor(Math.random() * 1000 + 1)
            // Khi nhập thêm một danh sách các staff, dữ liệu sẽ được thêm lưu mới vào biến newStaff trong đó
            // state được set lại gồm dữ liệu cũ (sử dụng toán tử  spread và thêm newStaff)
            const newStaff = {id, ...staff};
            this.setState({
                staff: [...this.state.staffs, newStaff],
            })
        }

        return (
            <div>
                <Header/>
                <Switch>
                <Route
                        path="/staff"
                        component={() => (
                            <StaffList 
                                onAddStaff={addStaff}
                                staffs={this.state.staffs} 
                            />
                        )}
                    />
                </Switch>
                <Footer/>
            </div>
        )
    }
}

export default Main;

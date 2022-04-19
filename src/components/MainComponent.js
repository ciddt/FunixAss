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
        
        return (
            <div>
                <Header/>
                <Switch>
                <Route
                        path="/staff"
                        component={() => (
                        <StaffList staffs={this.state.staffs} />
                        )}
                    />
                </Switch>
                <Footer/>
            </div>
        )
    }
}

export default Main;

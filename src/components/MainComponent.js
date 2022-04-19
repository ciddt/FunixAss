import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { STAFFS, DEPARTMENTS } from "../shared/staffs";

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
                <Footer/>
            </div>
        )
    }
}

export default Main;

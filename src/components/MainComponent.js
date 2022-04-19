import React, { Component } from "react";
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
                
            </div>
        )
    }
}

export default Main;

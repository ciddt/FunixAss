import React, { Component } from "react";
import StaffList from "./shared/component/StaffList";
import { STAFFS } from "./shared/staffs";

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      staffs: STAFFS
    }
  }
  render() {
    return (
      <div className="wrapper">
        <StaffList/>
      </div>
    )
  }
}

export default App;

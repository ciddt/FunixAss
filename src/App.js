import React, { Component } from "react";
import {} from "bootstrap/dist/css/bootstrap.min.css";
import StaffList from "./shared/component/StaffList";
import { STAFFS } from "./shared/staffs";

const Navbar = () => (
  <nav className="navbar navbar-dark bg-primary">
    <div className="container">
      <span className="navbar-brand text-white">
        ỨNG DỤNG QUẢN LÝ NHÂN VIÊN v1.0
      </span>
    </div>
  </nav>
)
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
        <Navbar/>
        <StaffList staffs={this.state.staffs}/>
      </div>
    )
  }
}

export default App;

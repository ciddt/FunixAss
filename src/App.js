import React, { Component } from "react";
import {} from "bootstrap/dist/css/bootstrap.min.css";
import StaffList from "./shared/component/StaffList";
import { STAFFS } from "./shared/staffs";

// Tạo riêng Navbar component và sử dung nó trong App Component 
// để improve performance thay vì viết thẳng render trong App Component
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
  // khởi tạo state staffs và truyền nó cho children là StaffList component
  constructor (props) {
    super(props)
    this.state = {
      staffs: STAFFS 
    }
  }
  // component children StaffList sẽ nhận props là state của App component
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

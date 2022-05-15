import React, { Component } from "react";
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavbarBrand } from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  //When search name finish => url change to /search/searchName
  changeUrlSearch(searchName) {
    console.log(searchName)
    window.location.pathname = `/search/${searchName}`
  }

  render() {
    return (
      <div>
        <Navbar dark expand="md" color="warning" className="shadow mb-3">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="/assets/images/logo.png"
                height="40"
                width="40"
                alt="Ristorante Con Fusion"
              />
            </NavbarBrand>
            <Collapse navbar isOpen={this.state.isNavOpen}>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link text-dark" to="/staff">
                    <span className="fa fa-users fa-lg mr-1"></span>
                    Nhân viên
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link text-dark" to="/departments">
                    <span className="fa fa-id-card-o fa-lg mr-1"></span>
                    Phòng Ban
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link text-dark" to="/salary">
                    <span className="fa fa-money fa-lg mr-1"></span>
                    Bảng Lương
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Header;
import React, { Component } from "react";
import { Nav, 
    Navbar, 
    NavbarBrand, 
    NavItem, 
    NavbarToggler, 
    Collapse
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
    constructor(props){
        super(props);
        this.wrapper = React.createRef();
        this.state = {
            isNavOpen: false
        }
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }
    render() {
        return (
            <div ref={this.wrapper}>
                <Navbar
                    color="warning"
                    container="md"
                    expand="md"
                    light
                >
                    <NavbarBrand>
                        <img 
                            src="assets/image/logo.png"
                            alt="Ristorante Con Fusion"
                            width="40"
                            height="30"
                        />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse 
                        navbar 
                        isOpen={this.state.isNavOpen}
                    >
                        <Nav
                            className="me-auto"
                            navbar
                        >
                            <NavItem>
                                <NavLink to="/staff" className="nav-link">
                                    <i className="fa fa-users fa-lg me-1"></i>
                                    Nhân Viên
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/department" className="nav-link">
                                    <i className="fa fa-id-card-o fa-lg me-1"></i>
                                    Phòng Ban
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/salary" className="nav-link">
                                    <i className="fa fa-money fa-lg me-1"></i>
                                    Bảng Lương
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Header;  
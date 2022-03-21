import React, { Component } from "react";
import {} from "bootstrap/dist/css/bootstrap.min.css";
import dateFormat from "dateformat";

const StaffListCard = ({staffData, column, onClick}) => (
    <div className={column}>
        <div className="card mt-1 border-warning">
            <div 
                className="card-body"
                onClick={onClick}
            >
                {staffData.name}
            </div>
        </div>
    </div>
)

const columnArray = [
    {
        id: 1,
        name: "Một Cột",
        class: "col-12"
    },
    {
        id: 2,
        name: "Hai Cột",
        class: "col-12 col-md-6 col-lg-6"
    },
    {
        id: 3,
        name: "Ba Cột",
        class: "col-12 col-md-4 col-lg-4"
    },
    {
        id: 4,
        name: "Bốn Cột",
        class: "col-12 col-md-3 col-lg-3"
    },
    {
        id: 5,
        name: "Sáu Cột",
        class: "col-12 col-md-2 col-lg-2"
    }
]

const ChangeColumn = ({columnData, onClick}) => (
    <div>
        <button
            onClick={() => onClick(columnData.class)}
        >{columnData.name}</button>
    </div>
)
class StaffList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columnSelected: "col-12 col-md-6 col-lg-4",
            staffDetail: null,
        }
    }

    staffDetailHandler(staff) {
        this.setState({
            staffDetail: staff
        })
    }

    staffDetailRender(staff) {
        if (staff != null) {
            return (
                <div className="card mt-3 border-warning">
                    <div className="row g-0">
                        <div className="col-12 col-md-4 text-center">
                            <img 
                                src={staff.image}
                                alt={staff.name}
                                className="img-fluid rounded-start"
                            />
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card-body">
                                <h5 className="card-title text-center mb-3">
                                    Họ Và Tên: {staff.name}
                                </h5>
                                <p className="card-text">
                                    <span className="fw-bold">Ngày sinh: </span>
                                    {dateFormat(staff.doB, "dd/mm/yyyy")}
                                </p>
                                <p className="card-text">
                                    <span className="fw-bold">Ngày vào công ty: </span>
                                    {dateFormat(staff.startDate, "dd/mm/yyyy")}
                                </p>
                                <p className="card-text">
                                    <span className="fw-bold">Bộ phận: </span>
                                    {staff.department.name}
                                </p>
                                <p className="card-text">
                                    <span className="fw-bold">Số ngày nghỉ còn lại: </span>
                                    {staff.annualLeave}
                                </p>
                                <p className="card-text">
                                    <span className="fw-bold">Số ngày làm thêm: </span>
                                    {staff.overTime}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }


    render() {
        const changeColumnHandler = (col) => (
            this.setState({
                columnSelected: col
            })
        )
        return (
            <div className="container">
                <div className="row">
                    {
                        columnArray.map(column => (
                            <ChangeColumn
                                key={column.id}
                                columnData={column}
                                onClick={changeColumnHandler}
                            />
                        ))
                    }
                </div>
                <div className="row">
                    {
                        this.props.staffs.map(staff => (
                            <StaffListCard
                                key={staff.id}
                                staffData={staff}
                                column={this.state.columnSelected}
                                onClick={() => this.staffDetailHandler(staff)}
                            />
                        ))
                    }
                </div>
                <div className="row">
                    {this.staffDetailRender(this.state.staffDetail)}
                </div>
                <p className="text-danger fw-bold text-center mt-3">
                    Bấm để xem thêm thông tin.
                </p>
            </div>
        )
    }
}

export default StaffList;
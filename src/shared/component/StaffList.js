import React, { Component } from "react";
import {} from "bootstrap/dist/css/bootstrap.min.css";
import dateFormat from "dateformat";

// component StaffListCard nhận props là staffData, column và onClick
// Nó trả lại khối card hiển thị tên của nhân viên
const StaffListCard = ({staffData, column, onClick}) => (
    <div className={column}>
        <div className="card mt-3 border-warning">
            <div 
                className="card-body staff-list"
                onClick={onClick}
            >
                {staffData.name}
            </div>
        </div>
    </div>
)

// Khởi tạo biến columnArray để lưu giá trị column sẽ được thay đổi
const columnArray = [
    {
        id: 1,
        name: "Một Cột",
        class: "col-12"
    },
    {
        id: 2,
        name: "Hai Cột",
        class: "col-6 col-md-6 col-lg-6"
    },
    {
        id: 3,
        name: "Ba Cột",
        class: "col-4 col-md-4 col-lg-4"
    },
    {
        id: 4,
        name: "Bốn Cột",
        class: "col-4 col-md-3 col-lg-3"
    },
    {
        id: 5,
        name: "Sáu Cột",
        class: "col-4 col-md-2 col-lg-2"
    }
]

// Tạo ChangeColumn component nhận 2 props là columnData và onClick
// Thay vì đặt function trong render của StaffList component như với StaffListCard Component
// thì đặt theo cách này sẽ improve performance tốt hơn
const ChangeColumn = ({columnData, onClick}) => (
    <div className="d-grid gap-2 d-md-block m-1 mx-auto col-12 col-md-2 col-lg-2">
        <button
            onClick={() => onClick(columnData.class)}
            className="btn btn-warning"
        >{columnData.name}</button>
    </div>
)
class StaffList extends Component {
    // Đặt state columnSelected staffDetail và có giá trị mặc định
    // Chúng sẽ được thay đổi với phương thức setState()
    constructor(props) {
        super(props)
        this.state = {
            columnSelected: "col-12 col-md-6 col-lg-4",
            staffDetail: null,
        }
    }

    // Khi click vào card tên nhân viên sẽ gọi đến hàm staffDetailHandler
    // để thiết lập lại state từ null thành dữ liệu thông tin tương ứng
    staffDetailHandler(staff) {
        this.setState({
            staffDetail: staff
        })
    }

    // Sau khi hàm staffDetailHandler thì staffDetailRender sẽ được gọi
    // để thực thi render ra thông tin chi tiết của nhân viên
    // Nếu props truyền về là null thì sẽ trả lại thẻ div rỗng
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
        // Hàm changeColumnHandler nhận props là col và thực hiện set lại 
        // state columnSelected sang props col tương ứng
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
                {/**Sử dụng this.props.staffs vì props được nhận từ App component */}
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
                {/**Sử dụng this.state.staffDetail vì đây là state của chính nó */}
                <div className="row p-2">
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
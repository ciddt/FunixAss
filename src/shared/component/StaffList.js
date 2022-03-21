import React, { Component } from "react";
import {} from "bootstrap/dist/css/bootstrap.min.css";
import dateFormat from "dateformat";

const StaffListCard = ({staffData}) => (
    <div className="col-12 col-md-6 col-lg-4">
        <div className="card mt-1 border-warning">
            <div className="card-body">
                {staffData.name}
            </div>
        </div>

    </div>
)
class StaffList extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        this.props.staffs.map(staff => (
                            <StaffListCard
                                key={staff.id}
                                staffData={staff}
                            />
                        ))
                    }
                </div>
                <p className="text-danger fw-bold text-center">
                    Bấm để xem thêm thông tin.
                </p>
            </div>
        )
    }
}

export default StaffList;
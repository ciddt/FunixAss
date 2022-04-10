import React from "react";

const RenderDepartment = ({department}) => (
    <div className="col-12 col-md-4 col-lg-2">
        <div className="card border-warning mt-3 mb-3 shadow">
            <div className="card-body">
                <h5 className="card-title">{department.name}</h5>
                <p className="card-text">
                    {`Số lượng nhân viên: ${department.numberOfStaff}` }
                </p>
            </div>
        </div>
    </div>
)

const Department = (props) => {
    return (
        <div className="container">
            <h4 className="mt-2">Phòng Ban</h4>
            <div className="row shadow mt-5 mb-5">
                {
                    props.departments.map((department) => (
                        <RenderDepartment
                            key={department.id}
                            department={department}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Department;
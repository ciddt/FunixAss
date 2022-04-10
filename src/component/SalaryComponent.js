import React, { useState } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

const basicSalary = 3000000;
const overTimeSalary =200000;

const RenderSalary = ({salary}) => (
    <div className="card border-warning mt-3 mb-3 shadow">
        <div className="card-body">
            <h5 className="card-title text-center">{salary.name}</h5>
            <p className="card-text">
                {`Mã nhân viên: ${salary.id}`}
            </p>
            <p className="card-text">
                {`Hệ số lương: ${salary.salaryScale}`}
            </p>
            <p className="card-text">
                {`Số giờ làm thêm: ${salary.overTime}`}
            </p>
            <p className="card-text">
                {`Lương:
                ${(salary.salaryScale * basicSalary + 
                salary.overTime * overTimeSalary).toFixed(0)}`}
            </p>
        </div>
    </div>
)

const Salary = (props) => {
    const [sortSalary, setSortSalary] = useState()

    const salary = props.staffs
    .sort((a,b) => sortSalary ? a.salaryScale - b.salaryScale : b.salaryScale - a.salaryScale)
    .map((salary) => {
        return (
            <div 
                key={salary.id}
                className="col-12 col-md-4 col-lg-2 mt-2 mb-2"
            >
                <RenderSalary 
                    salary={salary}
                />
            </div>
        )
    })

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link 
                            to="/staff" 
                            className="text-decoration-none"
                        >
                            Nhân viên
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <button
                className="btn btn-warning"
                onClick={() => setSortSalary(!sortSalary)}
            >
                Sắp xếp theo hệ số lương
            </button>
            <div className="row shadow mb-3 mt-3">
                {salary}
            </div>
        </div>
    )
}

export default Salary;
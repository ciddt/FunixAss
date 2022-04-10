import React, { useState } from "react";
import { Link } from "react-router-dom";

const RenderStaffList = ({staff}) => (
    <Link 
        to={`/staff/${staff.id}`} 
        className="text-center text-decoration-none"
    >
        <div className="card border-warning mt-3 mb-3 shadow">
            <img 
                src={staff.image}
                alt={staff.name}
                className="card-img-top"
            />
            <div className="card-body">
                <h5 className>{staff.name}</h5>
            </div>
        </div>
    </Link>
)

// Lưu số cột vào biến cols
const cols = [
    {
        name: "Một Cột",
        classColumn: "col-12"
    },
    {
        name: "Hai Cột",
        classColumn: "col-6"
    },
    {
        name: "Ba Cột",
        classColumn: "col-6 col-md-4 col-lg-4"
    },
    {
        name: "Bốn Cột",
        classColumn: "col-6 col-md-3 col-lg-3"
    },
    {
        name: "Sáu Cột",
        classColumn: "col-6 col-md-2 col-lg-2"
    }
]

// Sử dụng phương thức useState để thay đổi giao diện (trạng thái của state)
const StaffList = (props) => {
    const [name, setName] = useState("");
    const [column, setColumn] = useState("col-6 col-md-4 col-lg-2 mt-3 mb-3")
    const [sortId, setSortId] = useState()

    // Sử dụng sort() và filter để thực hiện chức năng sắp xếp và tìm kiếm
    const staffList = props.staffs
    .sort((a,b) => sortId ? a.id - b.id : b.id - a.id)
    .filter((staff) => {
        if (name === "")
            return staff;
        else if (staff.name.toLowerCase().includes(name.toLowerCase()))
            return staff;
        return 0;
    })
    .map((staff) => {
        return (
            <div 
                key={staff.id}
                className={column}
            >
                <RenderStaffList staff={staff}/>
            </div>
        )
    })

    return (
        <div className="container">
            <h4 className="mt-2">Nhân Viên</h4>
            <div className="btn-group col-12">
                {/**Lựa chọn sắp xếp số cột */}
                    <select
                        className="custom-select btn btn-warning border text-black"
                        onChange={e => setColumn(e.target.value)}
                    >
                        <option>Chọn số cột trình bày</option>
                        {cols.map((col) => (
                            <option
                                key={col.classColumn}
                                value={col.classColumn}
                            >
                                {col.name}
                            </option>
                        ))}
                    </select>
                    <button
                        className="btn btn-warning border"
                        onClick={() => setSortId(!sortId)}
                    >
                        Sắp xếp theo mã số nhân viên
                    </button>
                    <input
                        className="btn btn-warning border"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Tìm kiếm nhân viên"
                    />
            </div>
            <div className="row shadow mt-5 mb-5">
                {staffList}
            </div>
        </div>
    )
}

export default StaffList;
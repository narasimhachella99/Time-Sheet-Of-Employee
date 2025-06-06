import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeNav from "../Navbar/EmployeeNav";
import { useNavigate } from "react-router-dom";
import AdminHome from "./AdminHome";
import AdminNav from "../Navbar/AdminNav";

const ViewWork = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const viewWork = async () => {
        const getWork = await axios.get(`http://localhost:8080/work`);
        console.log(getWork.data, "work");
        setData(getWork.data);
    };
    useEffect(() => {
        viewWork();
    }, []);
    const handleTitleChange = e => {
        setData(
            data.filter(hotel => {
                return hotel.day?.toString().includes(e.target.value.toString()) || hotel.year?.toString().includes(e.target.value.toString()) || hotel.month.toLowerCase().includes(e.target.value.toLowerCase()) || hotel.employeeName.toLowerCase().includes(e.target.value.toLowerCase());
            })
        )
    };
    const handleClick = (id) => {

     window.print();
     

    }
    return (
        <div className="container mt-3 ">
            <AdminNav />
            <div className="row">
                <div className="col-sm-3 mt-4">


                    <form className="d-flex" role="search">
                        <div className="">
                            <input
                                className="form-control my-0 py-1 red-border text-info w-full"
                                type="text"
                                onChange={handleTitleChange}
                                placeholder="Search by month,date,emp"
                                aria-label="Search"
                            />
                            <div className="input-group-append text-info">
                                <span
                                    className=""
                                    id="basic-text1"
                                >
                                    <i
                                        className="fa fa-search text-info"
                                        style={{ " fontSize": 30 }}
                                    />
                                </span>
                            </div>
                        </div>
                    </form>   </div>
                <div className="col-sm-2 mt-4">  
                    <button className="btn btn-primary" onClick={() =>handleClick()}> DownLoad</button>
                </div>
            </div>
            <table className="table table-warning mt-5">
                <thead>
                    <tr>
                    <th>Employee Name
                        </th>
                        <th>activity</th>
                        <th>Date</th>
                        <th>month</th>

                        <th>year
                        </th>
                        <th>inTime</th>

                        <th>outTime
                        </th>
                        <th>Total Working Time
                        </th>

                    </tr>
                </thead>

                {data.map((bus, index) => {
                    return (
                        <tbody key={index}>
                            <tr> <td className="bg-red-500 hover:bg-yellow-500 text-danger font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    {bus.employeeName}
                                </td>
                                <td>
                                    {bus.activity}
                                </td>
                                <td>
                                    {bus.day
                                    }
                                </td>
                                <td>
                                    {bus.month
                                    }
                                </td><td>
                                    {bus.year

                                    }
                                </td>
                                <td>
                                    {bus.inTime
                                    }
                                </td>
                                <td>
                                    {bus.outTime

                                    }
                                </td>
                                <td>
                                    {bus.workingHours} hours {bus.workingMinutes} minutes</td>


                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </div>
    );
};

export default ViewWork;

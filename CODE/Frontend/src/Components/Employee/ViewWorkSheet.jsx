import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeNav from "../Navbar/EmployeeNav";

const ViewWorkSheet = () => {
    const email = JSON.parse(localStorage.getItem("email"));
    const [user, setUser] = useState([]);
    const [data, setData] = useState([]);
    const [date, setDate] = useState({
        fromDate: null,
        toDate: null
    })
    const viewWork = async () => {

        const res = await axios.get(`http://localhost:8080/employee/${email}`)
        console.log(res.data, "data");
        setUser(res.data)
        const getWork = await axios.get(`http://localhost:8080/works/${res.data.name}`);
        console.log(getWork.data, "work");
        setData(getWork.data);
        // const getByDate=await axios.get(`http://localhost:8080/getWorkByDate/${date.fromDate}/${date.toDate}`)
        // console.log(getByDate.data,"data");
        // setData(getByDate.data)
    };
    useEffect(() => {
        viewWork();
    }, []);
    const handleTitleChange = e => {
        setData(
            data.filter(hotel => {
                return hotel.day?.toString().includes(e.target.value.toString()) || hotel.year?.toString().includes(e.target.value.toString()) || hotel.month.toLowerCase().includes(e.target.value.toLowerCase());
            })
        )
    };
    const handleDateChange = (e) => {
        setDate({
            ...date,
            [e.target.name]: e.target.value
        });
    }
    const getData = async () => {
        const res = await axios.get(`http://localhost:8080/getWorkByDate/${date.fromDate}/${date.toDate}/${user.name}`);
        console.log(res.data, "data");
        setData(res.data)
    }
  
    console.log(date, "date")
    return (
        <div className="container mt-3 ">
            <EmployeeNav />

            <div className="row">
                <div className="col-sm-3 mt-4">


                    <form className="d-flex" role="search">
                        <div className="">
                            <input
                                className="form-control my-0 py-1 red-border text-info"
                                type="text"
                                onChange={handleTitleChange}
                                placeholder="Search by month,date,year"
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
                    <button className="btn btn-primary" onClick={() => window.print()}> DownLoad</button>

                </div>
                <div className="col-sm-1"></div>
                <div className="col-sm-2 mt-4">
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        name="fromDate"
                        onChange={handleDateChange}
                        value={date.fromDate}
                        placeholder="Enter From Date"
                    />
                </div>
                <div className="col-sm-2 mt-4">
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        name="toDate"
                        onChange={handleDateChange}
                        value={date.toDate}
                        placeholder="Enter To Date"
                    />
                </div> <div className="col-sm-2 mt-4">
                    <button className="btn btn-info" onClick={() => getData()}> Get workSheet b/n Two Dates</button>

                </div>
            </div>
            <table className="table table-warning table-striped mt-5">
                <thead>
                    <tr>   <th>EMployee Name
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
                            <tr> <td>
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

export default ViewWorkSheet;

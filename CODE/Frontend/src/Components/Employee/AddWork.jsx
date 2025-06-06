import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MainNav from "../Navbar/MainNav";
import EmployeeNav from "../Navbar/EmployeeNav";
const AddWork = () => {
const email = JSON.parse(localStorage.getItem("email"));

    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    const [data, setData] = useState({
        activity: "",
        day: "",
        month: "",
        year: null,
        inTime: "",
        outTime: "",
        employeeName:""
    });

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };
    const getByEmail=async() => {
        const res=await axios.get(`http://localhost:8080/employee/${email}`)
        console.log(res.data,"data");
        setUser(res.data)
    }
    useEffect(() => {
        getByEmail();
    },[])
    const handleSubmit = async (e) => {
e.preventDefault();
        try {

            const res = await axios.post(`http://localhost:8080/work`, data);
            console.log(res.data, "res");
            toast.info("work Added Successfully", {});
            setData({
                activity: "",
                day: "",
                month: "",
                year: null,
                inTime: "",
                outTime: "",
                employeeName:""
            });

            // navigate("/login")
        } catch (err) {
            console.log(err, "erro");
        }
    };
    return (
        <div className="cardbg">
            <EmployeeNav />
            <div className="container">

            <div className="row">
                
                <div className="col-sm-5">
                    <div className="card mt-5">
                        <div className="text-sky-600 fs-4 mb-3 px-3 mt-3">ADD WORK</div>
                        <div className="card-body">
                            <form class="w-full max-w-lg" onSubmit={handleSubmit}>
                                <div class="flex flex-wrap -mx-3 mb-6">
                                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label
                                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            for="grid-first-name"
                                        >
                                            activity
                                        </label>
                                        <input
                                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-first-name"
                                            type="text"
                                            name="activity"
                                            onChange={handleChange}
                                            value={data.activity}
                                            placeholder="Enter work on that day"
                                        />
                                    </div>
                                    <div class="w-full md:w-1/2 px-3">
                                        <label
                                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            for="grid-last-name"
                                        >
                                            Date of the day
                                        </label>
                                        <input
                                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-last-name"
                                            onChange={handleChange}
                                            type="number"
                                            min="01"
                                            max="31"
                                            step="1"
                                            name="day"
                                            value={data.day}
                                            placeholder="day"
                                        />
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 mb-6">
                                    {" "}<div class="w-full md:w-1/2 px-3">
                                        <label
                                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            for="grid-last-name"
                                        >
                                            month
                                        </label>
                                        <select class="form-select" aria-label="Default select example" name="month" onChange={handleChange} value={data.month}>
                                            <option selected>January</option>
                                            <option value="February">February</option>
                                            <option value="March">March</option>
                                            <option value="April">April</option>
                                            <option value="May">May</option>
                                            <option value="June">June</option>
                                            <option value="July">July</option>
                                            <option value="August">August</option>
                                            <option value="September">September</option>
                                            <option value="October">October</option>
                                            <option value="November">November</option>
                                            <option value="December">December</option>


                                        </select>
                                    </div>
                                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label
                                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            for="grid-first-name"
                                        >
                                            year
                                        </label>
                                        <input
                                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-first-name"
                                            type="number"
                                            min="2000" max="2099"
                                            step="1"
                                            name="year"
                                            onChange={handleChange}
                                            value={data.year}
                                            placeholder="year"
                                        />
                                    </div>
                                </div>

                                <div class="flex flex-wrap -mx-3 mb-6">
                                    {" "}<div class="w-full md:w-1/2 px-3">
                                        <label
                                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            for="grid-last-name"
                                        >
                                            inTime
                                        </label>
                                        <input
                                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-last-name"
                                            type="time"
                                            onChange={handleChange}
                                            name="inTime"
                                            value={data.inTime}
                                            placeholder="inTime"
                                        />
                                    </div>
                                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label
                                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            for="grid-first-name"
                                        >
                                            outTime
                                        </label>
                                        <input
                                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-first-name"
                                            type="time"

                                            name="outTime"
                                            onChange={handleChange}
                                            value={data.outTime}
                                            placeholder="outTime"
                                        />
                                    </div>
                                </div>
                                <div class="w-full md:w-1/2 px-3">
                                        <label
                                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            for="grid-last-name"
                                            hidden
                                        >
                                            employeeName
                                        </label>
                                        <input
                                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-last-name"
                                            type="text"
                                            onChange={handleChange}
                                            hidden
                                            name="employeeName"
                                            value={data.employeeName = user.name}
                                            placeholder="inTime"
                                        />
                                    </div>
                                <button
                                    className="btn btn-primary text-sky-900 mt-2 mr-20"
                                    type="submit"
                                  
                                >
                                    SUBMIT
                                </button>
                               
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-sm-1"></div>
                <div className="col-sm-6 mt-5">
                    <div className="card">
                        <div className="card-img">
                            <img src="https://juntrax.com/blog/wp-content/uploads/2020/05/Best-Timesheet-Software.jpg"></img>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default AddWork;

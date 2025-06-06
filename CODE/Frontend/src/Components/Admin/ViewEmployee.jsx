import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeNav from "../Navbar/EmployeeNav";
import AdminNav from "../Navbar/AdminNav";

const ViewEmployee = () => {
    const [data, setData] = useState([]);
    const viewWork = async () => {
        const getWork = await axios.get(`http://localhost:8080/employee`);
        console.log(getWork.data, "work");
        setData(getWork.data);
    };
    useEffect(() => {
        viewWork();
    }, []);
    
    return (
        <div className="container mt-3 ">
            <AdminNav />
         
            <table className="table table-warning table-striped mt-5">
                <thead>
                    <tr>
                    <th>Id</th>

                        <th>Name</th>
                        <th>Email</th>

                        <th>PhoneNumber
                        </th>
                       

                    </tr>
                </thead>

                {data.map((bus, index) => {
                    return (
                        <tbody key={index}>
                            <tr>
                                <td>
                                    {bus.id}
                                </td>
                                <td>
                                    {bus.name
                                    }
                                </td>
                                <td>
                                    {bus.email
                                    }
                                </td><td>
                                    {bus.phoneNumber

                                    }
                                </td>
                                

                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </div>
    );
};

export default ViewEmployee;

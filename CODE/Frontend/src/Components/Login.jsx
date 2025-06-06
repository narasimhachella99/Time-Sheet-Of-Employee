import React from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MainNav from "./Navbar/MainNav";
const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/login`, data);
      console.log(res.data, "login");

      if (res.data.msg === "admin login Successfully") {
        toast.success("admin login Successfully..!", {
          position: "top-center"
        });
        navigate("/adminHome");

        console.log(res.data, "userlogin");
      } else {
        navigate("/employeeHome");
        toast.success("employee Login Successfully..!", {
          position: "top-center"
        });
        console.log(res.data, "login");
      }
      window.location.reload(true);

      localStorage.setItem("email", JSON.stringify(data.email));
    } catch (err) {
      console.log(err.response.data, "message");
      toast.error(err.response.data.msg, {});
    }
  };
  return (
    <div className="adminbg">
      <MainNav />
      <div className="row mt-5">
        <div className="col-sm-2" />
        <div className="col-sm-4">
          <div className="w-full max-w-xs">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  placeholder="Username"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="******"
                />
                <p className="text-red-500 text-xs italic">
                  Please choose a password.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
              <div className="mt-3  row">
                <Link
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  to="/register"
                >
                  You don't have an account? Register ?
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="col-sm-5">
            <div className="card">
                <div className="card-img">
                    <img src="https://images.ctfassets.net/lzny33ho1g45/best-lms-p-img/9a84fc48d84211e999615d602472690a/file.png?w=1520&fm=jpg&q=30&fit=thumb&h=760"></img>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

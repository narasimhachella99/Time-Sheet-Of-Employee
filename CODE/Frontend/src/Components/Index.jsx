import React from "react";
import MainNav from "./Navbar/MainNav";

const Index = () => {
  return (
    <div className="">
      <MainNav />
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <div className="card-img mt-5">
              <img src="https://www.zoho.com/invoice/what-is-a-timesheet/what-is-a-timesheet-1x.png"></img>

            </div>
          </div>
          <div className="col-sm-4">
            <div className=" mt-5 display-3 text-center text-danger">TIME SHEET OF A EMPLOYEE</div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Index;

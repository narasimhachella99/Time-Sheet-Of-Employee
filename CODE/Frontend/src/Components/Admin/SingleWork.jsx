import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AdminNav from '../Navbar/AdminNav';
import axios from 'axios';

const SingleWork = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const viewWork = async () => {

    const res = await axios.get(`http://localhost:8080/work/${params.id}`)
    console.log(res.data, "data");
    setData(res.data)

  };
  useEffect(() => {
    viewWork();
  }, []);
  return (
    <div>
      {/* <AdminNav /> */}
      <div className='container'>

        <div className='row'>
          <div className='col-sm-3'></div>
          <div className='col-sm-6 mt-5'>
            <div className='card'>
              <div className='card-header'>
                <h1 className='text-red-600 fs-3  text-center font-bold'>WORK SHEET</h1>
              </div>
              <div className='row'>
               
                <div className='col-sm-6'>
                  <div className='card-text px-4'>
                   <p><h3 className='text-blue-400 mt-2 mb-3'> WORK DONE: </h3> {data.activity} 
                   </p>  </div>
                </div>
              
              <div className='col-sm-6 mb-3'>
                  <div className='card-text px-4'>
                   <p>              <h3 className='text-blue-400 mt-2 mb-3'> DATE </h3>{data.day}-{data.month}-{data.year}

                   </p>  </div>
                </div>
              </div>
              <div className='row'>
               
               <div className='col-sm-6'>
                 <div className='card-text px-4'>
                  <p><h3 className='text-blue-400 mt-2 mb-3'> INTIME </h3> {data.inTime} 
                  </p>  </div>
               </div>
             
             <div className='col-sm-6 mb-3'>
                 <div className='card-text px-4'>
                  <p>              <h3 className='text-blue-400 mt-2 mb-3'> OUTTIme </h3>{data.outTime}

                  </p>  </div>
               </div>

             </div>
            </div></div>
          </div>
        </div>
      </div>
  )
}

export default SingleWork;
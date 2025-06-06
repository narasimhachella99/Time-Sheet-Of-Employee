import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Index from './Components/Index';
import Login from './Components/Login';
import Register from './Components/Employee/Register';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import EmployeeHome from './Components/Employee/EmployeeHome';
import AddWork from './Components/Employee/AddWork';
import ViewWork from './Components/Admin/ViewWork';
import AdminHome from './Components/Admin/AdminHome';
import ViewEmployee from './Components/Admin/ViewEmployee';
import ViewWorkSheet from './Components/Employee/ViewWorkSheet';
import SingleWork from './Components/Admin/SingleWork';
  
function App() {
  
  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/employeeHome' element={<EmployeeHome/>}/>
        <Route path='/addWork' element={<AddWork/>}/>
        <Route path='/viewWork' element={<ViewWork/>}/>
        <Route path='/adminHome' element={<AdminHome/>}/>
        <Route path='/viewEmployee' element={<ViewEmployee/>}/>
        <Route path='/viewWorkSheet' element={<ViewWorkSheet/>}/>
        <Route path='/singleWork/:id' element={<SingleWork/>}/>
     </Routes>
    </Router>
    </>

  );
}

export default App;

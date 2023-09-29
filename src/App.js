import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import AddStudents from './Components/AddStudents';
import AddTeachers from './Components/AddTeachers';
import DashBoard from './Components/DashBoard';
import LoginPage from './Components/LoginPage';
import Nopage from './Components/Nopage';
import SignupPage from './Components/SignupPage';
import Students from './Components/Students';
import Teachers from './Components/Teachers';
import UpdateStudents from './Components/UpdateStudents';
import UpdateTeachers from './Components/UpdateTeachers';

function App() {
  const [students, setStudents] = useState([]);
  const [teachers,setTeachers]=useState([]);
  const navigate=useNavigate();
  
  useEffect(()=>{
    const getStudents = async () =>{
        const response = await fetch("https://644b33bc4bdbc0cc3a8ce28c.mockapi.io/users", {
          method:"GET",
        }); 
        const data = await response.json();
        if(data){
          setStudents(data)
        }
    }
    if(!localStorage.getItem("token")){
      navigate("/login")
    }else{
      getStudents();
    }
    
  }, )

  useEffect(()=>{
    const getTeachers = async () =>{
        const response = await fetch("https://6454e410a74f994b334bcd96.mockapi.io/teachers", {
          method:"GET",
        }); 
        const datas = await response.json();
        if(datas){
          setTeachers(datas)
        }
    }
    getTeachers();
  }, [])
  return (
    <div className="App">
      <Routes>

<Route exact path="/"
  element={<DashBoard/>} />

<Route path="/login"
  element={<LoginPage />}
/>

<Route path="/signup"
  element={<SignupPage />}
/>
<Route path="/students"
            element={<Students
            students = {students}
            setStudents ={setStudents}/>}
            />
          
          <Route path="/addstudents"
            element={<AddStudents
            students = {students}
            setStudents ={setStudents}/>}
            />
         
         <Route path="/edit/:id"
            element={<UpdateStudents
              students = {students}
              setStudents ={setStudents}/>}
            />
         
         <Route path="/teachers"
            element={<Teachers
            teachers = {teachers}
            setTeachers ={setTeachers}/>}
            />
          
          <Route path="/addteachers"
            element={<AddTeachers
            teachers = {teachers}
            setTeachers ={setTeachers}/>}
            />
          
          <Route path="/updateteachers/:id"
            element={<UpdateTeachers
            teachers = {teachers}
            setTeachers ={setTeachers}/>}
            />
           
           <Route path="**"
              element={<Nopage/>}
          />

</Routes>
    </div>
  );
}

export default App;

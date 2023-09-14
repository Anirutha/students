import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Base from '../Base/Base'


function SignupPage() {
    const navigate = useNavigate()
    const[username,setUserName]=useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   
    const handleLogin = async()=>{
        const userInfo = {
            email,
            password,
        }
const res = await fetch(`https://students-backend-cyan.vercel.app/users/signup`, {
    method :"POST",
    body : JSON.stringify(userInfo),
    headers:{
        "Content-Type":"application/json"
    }
});

   const data = await res.json();
  localStorage.setItem("token", data.data.token)
   navigate("/login")
    }
  return (
 <Base
 title={"Signup Page"}
 description={"Please signup to continue"}
 >
        <TextField  label="Name" variant="outlined" fullWidth sx={{ m: 1 }} 
         placeholder='Enter UserName'
         type="username"
         value= {username}
         onChange={(e)=>setUserName(e.target.value)}
         />   
        <TextField  label="Email" variant="outlined" fullWidth sx={{ m: 1 }} 
         placeholder='Enter Email'
         type="email"
         value= {email}
         onChange={(e)=>setEmail(e.target.value)}
         />
        <TextField  label="Password" variant="outlined" fullWidth sx={{ m: 1 }} 
         placeholder='Enter Password'
         type="Password"
         value ={password}
         onChange={(e)=>setPassword(e.target.value)}
         />
        <Button
        type="submit"
        variant="contained"
        onClick={handleLogin}
        >Signup</Button>
   </Base>

  )
}

export default SignupPage
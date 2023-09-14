import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Base({ title, description, children }) {
  const navigate = useNavigate()
  function handleLogout(){
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <div className='main-container'>
      <header>
        <nav>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography sx={{ mr: 2 }}>
                Student and Teacher Management
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="add students"
                onClick={() => navigate("/signup")}
                sx={{ mr: 2 }}>
                Signup
              </IconButton>

              <IconButton
                edge="end"
                color="inherit"
                aria-label="add students"
                onClick={() => navigate("/login")}
                sx={{ mr: 2 }}>
                Login
              </IconButton>

              <IconButton
                edge="end"
                color="inherit"
                onClick={() => navigate("/")}
                aria-label="dashboard" sx={{ mr: 2 }}>
                Dashboard
              </IconButton>

              <IconButton
                edge="end"
                color="inherit"
                onClick={() => navigate("/students")}
                aria-label="dashboard" sx={{ mr: 2 }}>
                Student-list
              </IconButton>

              <IconButton
                edge="end"
                color="inherit"
                onClick={() => navigate("/addstudents")}
                aria-label="dashboard" sx={{ mr: 2 }}>
                Add-Student
              </IconButton>

              <IconButton
                edge="end"
                color="inherit"
                onClick={() => navigate("/teachers")}
                aria-label="dashboard" sx={{ mr: 2 }}>
                Teacher-List
              </IconButton>

              <IconButton
                edge="end"
                color="inherit"
                onClick={() => navigate("/addteachers")}
                aria-label="dashboard" sx={{ mr: 2 }}>
                Add-Teacher
              </IconButton>

              <IconButton
                edge="end"
                color="inherit"
                aria-label="add students"
                onClick={handleLogout}
                sx={{ mr: 2 }}>
                logout
              </IconButton>

            </Toolbar>
          </AppBar>
        </nav>
      </header>
      <main>
        <h1>{title}</h1>
        <h4>{description}</h4>
        <div className='contents'>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Base
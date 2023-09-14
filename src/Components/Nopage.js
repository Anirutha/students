import React from 'react'
import Base from '../Base/Base'
import {useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

//function
function Nopage() {
  const navigate=useNavigate();
  return (
    <Base
      title={"404 NO Page Content"}
      description={"Wrong url please click below button"}
    >
      <Button
        onClick={() => navigate("/")}
      >
        Go to DashBoard
      </Button>
    </Base>
  )
}

export default Nopage
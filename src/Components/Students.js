import Base from '../Base/Base'
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//function
function Students({ students, setStudents}) {
  const navigate=useNavigate();
  // delete functionality
  const deleteStudent = async (studId) => {

    const response = await fetch(`https://644b33bc4bdbc0cc3a8ce28c.mockapi.io/users/${studId}`, {
      method: "DELETE",
    });

    const data = await response.json()
    if (data) {
      const remainingStudents =
        students.filter((stud, idx) => stud.id !== studId)
      setStudents(remainingStudents)
    }
  }

  return (
    <Base
      title={"Students Dashboard"}
      description={"The page contains all students data"}
    >
      <div className='card-container'>
        {students.map((stud, idx) => (
          <Card sx={{ maxWidth: 200, height: 220 }} key={idx}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {stud.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stud.batch}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stud.gender}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stud.qualification}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => navigate(`/edit/${stud.id}`)}>
                <EditIcon />
              </Button>
              <Button
                size="small"
                onClick={() => deleteStudent(stud.id)}>
                <DeleteIcon />
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </Base>
  )
}

export default Students
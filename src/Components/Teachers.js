import Base from '../Base/Base'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//function
function Teachers({ teachers, setTeachers }) {
  const navigate=useNavigate();
  // delete functionality
  const deleteStudent = async (studId) => {
    const response = await fetch(`https://6454e410a74f994b334bcd96.mockapi.io/teachers/${studId}`, {
      method: "DELETE",
    });

    const data = await response.json()
    if (data) {
      const remainingTeachers =
        teachers.filter((stud, idx) => stud.id !== studId)
      setTeachers(remainingTeachers)
    }
  }

  return (
    <Base
      title={"Teachers Dashboard"}
      description={"The page contains all teachers data"}
    >

      <div className='card-container'>
        {teachers.map((stud, idx) => (
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
                onClick={() => navigate(`/updateteachers/${stud.id}`)}
              >
                <EditIcon />
              </Button>
              <Button
                size="small"
                onClick={() => deleteStudent(stud.id)}
              >
                <DeleteIcon />
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </Base>
  )
}

export default Teachers
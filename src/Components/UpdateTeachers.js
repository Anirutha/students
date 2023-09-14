import { useNavigate, useParams } from 'react-router-dom'
import Base from '../Base/Base';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';

export const filedValidationSchema = yup.object({
  name: yup.string().required("Please fill in teachers name"),
  batch: yup.string().required("Please fill in teachers batch").min(5, "Please pass a valid batchname"),
  gender: yup.string().required("Please specify your gender"),
  qualification: yup.string().required("Please fill in teacher qualification")

});

//function
function UpdateTeachers({ teachers, setTeachers }) {
  const { id } = useParams();
  const editTeachers = teachers[id]
  const navigate=useNavigate();
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
    initialValues: {
      name: editTeachers.name,
      batch: editTeachers.batch,
      gender: editTeachers.gender,
      qualification: editTeachers.qualification,
      id:id
    },
    validationSchema: filedValidationSchema,
    onSubmit: (updStudentData) => {
      console.log("onsubmit", updStudentData);
      updateTeachers(updStudentData)
    },

  })

async function updateTeachers(updaStudents) {
    const response = await fetch(`https://6454e410a74f994b334bcd96.mockapi.io/teachers/${editTeachers.id}`, {
      method: "PUT",
      body: JSON.stringify(updaStudents),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()
    if (data) {
      teachers[id] = updaStudents
      setTeachers([...teachers])
      navigate("/teachers")
    }
  }

  return (
    <Base
      title={"Edit a Teacher"}
      description={"Edit Teacher data here"}
    >
      <div className='text-area-col'>
        <form onSubmit={handleSubmit}>
          <TextField
            name='name'
            fullWidth sx={{ m: 1 }}
            label="Name"
            variant="filled"
            type="name"
            onBlur={handleBlur}
            value={values.name}
            onChange={handleChange} />

          <div style={{ color: "crimson" }}>
            {touched.name && errors.name ? errors.name : ""}
          </div>

          <TextField
            name='batch'
            fullWidth sx={{ m: 1 }}
            label="Batch"
            variant="filled"
            type="batch"
            onBlur={handleBlur}
            value={values.batch}
            onChange={handleChange} />
          <div style={{ color: "crimson" }}>
            {touched.batch && errors.batch ? errors.batch : ""}
          </div>

          <TextField
            name='gender'
            fullWidth sx={{ m: 1 }}
            label="Gender"
            variant="filled"
            type="gender"
            onBlur={handleBlur}
            value={values.gender}
            onChange={handleChange} />
          <div style={{ color: "crimson" }}>
            {touched.gender && errors.gender ? errors.gender : ""}
          </div>

          <TextField
            name='qualification'
            fullWidth sx={{ m: 1 }}
            label="qualification"
            variant="filled"
            type="qualification"
            onBlur={handleBlur}
            value={values.qualification}
            onChange={handleChange} />
          <div style={{ color: "crimson" }}>
            {touched.qualification && errors.qualification ? errors.qualification : ""}
          </div>

          <Button
            type='submit'
            variant="contained">Update Teachers</Button>
        </form>
      </div>
    </Base>
  )
}

export default UpdateTeachers
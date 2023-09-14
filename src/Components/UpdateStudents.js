import { useNavigate, useParams } from 'react-router-dom'
import Base from '../Base/Base';
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material';


export const filedValidationSchema = yup.object({
  name: yup.string().required("Please fill in students name"),
  batch: yup.string().required("Please fill in students batch").min(5, "Please pass a valid batchname"),
  gender: yup.string().required("Please specify your gender"),
  qualification: yup.string().required("Please fill in student qualification")

});

//function
function UpdateStudents({ students, setStudents }) {
  const { id } = useParams();
  const editStudent = students[id]
  const navigate=useNavigate();
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
    initialValues: {
      name: editStudent.name,
      batch: editStudent.batch,
      gender: editStudent.gender,
      qualification: editStudent.qualification,
      id:id
    },
    validationSchema: filedValidationSchema,
    onSubmit: (updStudentData) => {
      console.log("onsubmit", updStudentData);
      updateStudent(updStudentData)
    },

  })

  async function updateStudent(updaStudents) {
    const response = await fetch(`https://644b33bc4bdbc0cc3a8ce28c.mockapi.io/users/${editStudent.id}`, {
      method: "PUT",
      body: JSON.stringify(updaStudents),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()
    if (data) {
      students[id] = updaStudents
      setStudents([...students])
      navigate("/students")
    }
  }

  return (
    <Base
      title={"Edit a Student"}
      description={"Edit Stuudents data here"}
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
            variant="contained">Update Students</Button>
        </form>
      </div>
    </Base>
  )
}

export default UpdateStudents
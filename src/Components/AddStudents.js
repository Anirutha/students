import Base from '../Base/Base'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import * as yup from 'yup'
import { useFormik } from 'formik'

export const filedValidationSchema = yup.object({
  name: yup.string().required("Please fill in students name"),
  batch: yup.string().required("Please fill in students batch").min(5, "Please pass a valid batchname"),
  gender: yup.string().required("Please specify your gender"),
  qualification: yup.string().required("Please fill in student qualification")

});
//Function

function AddStudents({ students, setStudents }) {
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
    initialValues: {
      name: "",
      batch: "",
      gender: "",
      qualification: "",
    },
    validationSchema: filedValidationSchema,
    onSubmit: (newStudentData) => {
      console.log("onsubmit", newStudentData);
      createStudent(newStudentData)
    },

  })

  const navigate=useNavigate();
  async function createStudent(newStudents) {
    const response = await fetch("https://644b33bc4bdbc0cc3a8ce28c.mockapi.io/users", {
      method: "POST",
      body: JSON.stringify(newStudents),
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await response.json()
    setStudents([...students, data])
    navigate("/students")

  }

  return (
    <Base
      title={"Add New Student"}
      description={"We can able to add new students data here"}
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
            variant="contained">Add Students</Button>
        </form>
      </div>
    </Base>
  )
}

export default AddStudents
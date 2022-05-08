import axios from 'axios'
import { Toast } from 'react-bootstrap'
export const getUsers = async () => {
  try {
    const { data } = await axios.get('http://localhost:8000/api/users')
    return data
  } catch (error) {
    console.error(error)
  }
}

export const deleteUser = (userId) => {
  // console.log(name, email , password)

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  axios
    .delete(`http://localhost:8000/api/user/delete/${userId}`, { headers })
    .then((res) => {
      if (res.error) {
        console.log(error)
      } else {
        return res.data
      }
    })
}

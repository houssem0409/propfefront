import Layout from "../components/Layout";
import React , {useContext, useEffect} from "react"
import { UserContext } from '../components/UserContext'
import axios from "axios";


export default function Test() {
    const { userr } = useContext(UserContext);

   
  useEffect(() => {
      pro();
})

    const token = userr?.data?.token
  


    const pro = async() => {
        const res = await axios.get(`http://localhost:8000/api/protected` , {
            headers : {
                Authorization : token            }
        })
        return JSON.stringify(res)
    }
    return (
      <Layout>
         <div>
        home
        <h2>About</h2>
        <pre>{JSON.stringify(userr, null, 2)}</pre>
      </div>

              
  
      </Layout>
   
  )
}

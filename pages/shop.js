import Layout from '../components/Layout'
import Card from '../components/Card'
import { getProducts } from './api/core'
import { useState  , useEffect} from 'react'
export default function shop() {
    const [products , setProducts] = useState()

    useEffect(() => {
        loadProductsBySell()
    } , [])
    
    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
           if(data.error){
               setError(data.error)
           }else {
               setProducts(data)
           }
        })   
     }

  return (
    <Layout title='Shop Page ' description='Search and find books of your choice !' className="container-fluid">
        {console.log(products)}
       

        {products?.map((product, i) =>(
             //console.log('the product'+product._id);
              
          <div key={i} className="col-4 mb-3">
                    
              <Card  product={product}/>
          </div>
        ))}
       
    </Layout>
  )
}

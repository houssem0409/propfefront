export const getProducts = (sortBy) => {
    // console.log(name, email , password)

    return fetch(`http://localhost:8000/api/products?sortBy=${sortBy}&order=desc&limit=6` , {
        method: "GET" ,
      
        
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
 }
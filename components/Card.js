import React, { useState } from 'react';
import ShowImage from './ShowImage';
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/dist/client/link';
export default function Card(
    {
        product,
     
      }
) {
    const [redirect, setRedirect] = useState(false);
   const router = useRouter()

    const shouldRedirect = redirect => {
      if (redirect) {
        return <Link href="/cart" />;
      }
    };
  

    const showCartUpdateOptions = cartUpdate => {
      return (
        cartUpdate && (
          <div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Adjust Quantity</span>
              </div>
              <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
            </div>
          </div>
        )
      );
    };
    const showRemoveButton = showRemoveProductButton => {
      return (
        showRemoveProductButton && (
          <button
           
            className="btn btn-outline-danger mt-2 mb-2"
          >
            Remove Product
          </button>
        )
      );
    };
    return (
      <div className="card ">
        <div className="card-header card-header-1 ">{product?.name}</div>
        <div className="card-body">
          {shouldRedirect(redirect)}
          <ShowImage item={product} url="product" />
          <p className="card-p  mt-2">{product.description} </p>
          {console.log("hhhzh"+product)}
          <p className="card-p black-10">$ {product.price}</p>
          <p className="black-9">Category: {product?.category && product.category.name}</p>
          <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
  
          
  
        
  
  
        </div>
      </div>
    );
}

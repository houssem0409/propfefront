import { API } from '../config'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function ShowImage({ props, url }) {
  console.log(props)
  return (
    <div
      className='product-img'
      style={{ borderRadius: '10px', border: '10px', borderColor: 'red' }}
    >
      <img
        src={`http://localhost:8000/api/${url}/photo/${props?._id}`}
        alt={props?.name}
        className='mb-3'
        style={{ maxHeight: '20%', maxWidth: '20%', borderRadius: '30px' }}
      />
      <button
        className='btn btn-success'
        style={{ position: 'relative', paddingTop: '5px', marginTop: '60px' }}
      >
        <i className='bi bi-pencil-square'></i>
      </button>
    </div>
  )
}

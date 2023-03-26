import 'bootstrap-icons/font/bootstrap-icons.css'

export default function ShowEventImage({ props, url }) {
  return (
    <div style={{ borderRadius: '10px', border: '10px', borderColor: 'red' }}>
      <img
        src={`http://localhost:8000/api/${url}/photo/${props?._id}`}
        alt={props?.name}
        style={{ maxHeight: '150px', maxWidth: '150px', borderRadius: '30px' }}
      />
    </div>
  )
}

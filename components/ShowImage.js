import 'bootstrap-icons/font/bootstrap-icons.css'

export default function ShowImage({ props, url }) {
  return (
    <div style={{ borderRadius: '10px', border: '10px', borderColor: 'red' }}>
      {props?.photo?.data ? (
        <img
          src={`http://localhost:8000/api/${url}/photo/${props?._id}`}
          alt={props?.name}
          style={{
            maxHeight: '150px',
            maxWidth: '150px',
            borderRadius: '30px',
          }}
        />
      ) : props?.logo ? (
        <img
          src={`${props?.logo}`}
          alt={props?.name}
          style={{
            maxHeight: '150px',
            maxWidth: '150px',
            borderRadius: '30px',
          }}
        />
      ) : (
        <img
          src={'../../images/logos/Startup_Symbol.PNG'}
          alt={props?.name}
          style={{
            maxHeight: '150px',
            maxWidth: '150px',
            borderRadius: '30px',
          }}
        />
      )}
    </div>
  )
}

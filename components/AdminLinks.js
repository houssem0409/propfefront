import Link from 'next/link'

export default function AdminLinks() {
  return (
    <div className='card'>
      <h4 className='card-header'>Admin Links </h4>
      <ul className='list-group'>
        <li className='list-group-item'>
          <Link className='nav-link' href='/admin/users'>
            Manage Users
          </Link>
        </li>
        <li className='list-group-item'>
          <Link className='nav-link' href='/admin/startups'>
            Manage Startups
          </Link>
        </li>
        <li className='list-group-item'>
          <Link className='nav-link' href='/admin/events'>
            Manage Events
          </Link>
        </li>
        <li className='list-group-item'>
          <Link className='nav-link' href='/admin/categories'>
            Manage Categories
          </Link>
        </li>
      </ul>
    </div>
  )
}

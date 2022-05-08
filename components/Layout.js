import Menu from './Menu'

export default function Layout({
  title = '',
  description = 'Description',
  className,
  children,
}) {
  return (
    <div>
      <Menu />

      <div className='container' style={{ height: '100vh' }}>
        {children}
      </div>
    </div>
  )
}

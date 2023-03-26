import Menu from './Menu'
import '../styles/Home.module.css'
export default function Layout({
  title = '',
  description = 'Description',
  className,
  children,
}) {
  return (
    <div>
      <div className='jumbo'></div>

      <Menu />

      <div className='container' style={{ height: '100vh' }}>
        {children}
      </div>
    </div>
  )
}

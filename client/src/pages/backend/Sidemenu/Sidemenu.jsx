import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useLocation,useNavigate } from 'react-router-dom' 
import './sidemenu.css'
import { logoutUserStart } from '../../../redux/action/user.acton'



function Sidebar() { 
  const currentUser = useSelector(state=>state.user.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()


  const logout = ()=>{
    dispatch(logoutUserStart())
    setTimeout(() => {
       navigate('/login')
    }, 1000);
  }

  useEffect(()=>{
  // console.log(currentUser);
  },[currentUser.role])
   
  return (
    <div className='col-sm-3 mt-1 levitate'>
           <ul className="list-group text-decoration-none shadow beonscreen">
              <Link to={'/dashboard'} className={`list-group-item acive text-decoration-none ${location.pathname.includes('dashboard') ? 'bg-dark text-white' : 'bg-white'}`}>Dashboard</Link><Link to={'/order'} className={`list-group-item text-decoration-none ${location.pathname.includes('order') ? 'bg-dark text-white' : 'bg-white'}`}>{currentUser?.role === 'customer' ? "My orders" : "Orders" }</Link>
              {currentUser.role === 'admin' && <>
              <Link to={'/admin/category'} className={`list-group-item text-decoration-none ${location.pathname.includes('category') ? 'bg-dark text-white' : 'bg-white'}`}>Category</Link>
              <Link to={'/admin/product'} className={`list-group-item text-decoration-none ${location.pathname.includes('product') ? 'bg-dark text-white' : 'bg-white'}`}>Product</Link>
              <Link to={'/admin/user'} className={`list-group-item text-decoration-none ${location.pathname.includes('user') ? 'bg-dark text-white' : 'bg-white'}`}>User</Link>
              <Link to={'/admin/manage-banners'} className={`list-group-item text-decoration-none ${location.pathname.includes('manage-banners') ? 'bg-dark text-white' : 'bg-white'}`}>Manage Visuals</Link></>}
              <Link onClick={logout} className={`list-group-item text-danger text-decoration-none fw-bold`}>Logout</Link>
           </ul>
           </div>
  ) 
}

export default Sidebar
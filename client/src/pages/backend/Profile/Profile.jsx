import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Ensure you import useSelector
import Sidebar from '../Sidemenu/Sidemenu';
import '../backend.css';
import { getCartStart } from '../../../redux/action/cart.action';
import { getWishListStart } from '../../../redux/action/wishlist.action';

function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);
  console.log(currentUser , users)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [img, setImg] = useState(null);

  const getUserById = () => {
    console.log("currentUSer id : ",currentUser?.id)
    if (users && currentUser) {
      const onBoardUser = users.filter(user => user._id === currentUser.id);
      if (onBoardUser.length > 0 && onBoardUser[0].image) {
        setImg(onBoardUser[0].image);
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getWishListStart(currentUser.id));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
     if(!currentUser.name){
       navigate('/login')
  }
    if (currentUser) { 
      getUserById(); 
    }
    dispatch(getCartStart())
  }, [currentUser, users]); // Include users in the dependency array

  return (
    <> 
      <div className="container-fluid page-header mt-3">
        <h1 className="text-center display-6 ">{currentUser.role ==='admin'? "Admin " :''}Profile</h1>
      </div>    
      <div className='container pt-4'>
        <div className='row'> 
          <Sidebar />
          <div className="card col-9 dashboard shadow">
            <div className="card-body ">
              <div className="card-header bg-dark d-flex justify-content-between">
                <h4 className="card-title text-white fw-bold mx-0">{currentUser.role ==='admin'? "Admin " :'User'} Profile</h4>
                <Link to={`/profile/edit/${currentUser?._id}`} className="btn btn-primary">Edit Profile</Link>
              </div>
              {img && (
                <img src={img} alt="Profile" className="mt-3" height="80px" width="80px" />
              )}
              <h5 className='mt-3 mx-2'>Name: {currentUser?.name || 'N/A'}</h5>
              <h5 className='mt-3 mx-2'>Contact Number: {currentUser?.contact || 'N/A'}</h5>
              <h5 className='mt-3 mx-2'>Email: {currentUser?.email || 'N/A'}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

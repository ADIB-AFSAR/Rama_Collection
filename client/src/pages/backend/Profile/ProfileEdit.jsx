import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import Sidebar from '../Sidemenu/Sidemenu';
import '../backend.css';
import { getUserStart, updateUserStart } from '../../../redux/action/user.acton'; // Ensure you import your action
import { useFormData } from '../../../hooks/useFormData';

const initialState = {
    name: '',
    image: '',
    status: '1', // Default to 'Active'
    contact: '',
    email: '',
    password: '',
};

function ProfileEdit() { 
  let { id } = useParams();
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const [handleChange, formData, setFormData] = useFormData(initialState, 'user');
  const navigate = useNavigate();
  
  const { name, email, contact, status, image, password } = formData;

  const submit = (event) => {
    event.preventDefault();
    dispatch(updateUserStart(formData));
    setTimeout(() => {
      navigate('/dashboard');
    }, 800);
  };

  const getUserById = () => {
     let user = users?.find((user) => user?._id === id);
    if (user) {
      setFormData(user);
    } else {
      console.warn("user ID : ", user?._id , id,"user did not matched to edit details")
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    if (id) {
      getUserById();
      dispatch(getUserStart());      
    }
  }, [id]); // Include users in the dependency array

  return (
    <> 
      <div className="container-fluid page-header mt-2">
        <h1 className="text-center display-6">Edit Profile</h1>
      </div>    
      <div className='container pt-4'>
        <div className='row'>
          <Sidebar />
          <div className="card editprofile col-9 shadow">
            <div className="card-body">
              <div className='card-header bg-dark d-flex justify-content-between'>
                <h4 className="card-title text-white fw-bold">Edit Profile</h4>
                <Link to="/dashboard" className='btn btn-primary text-white button'>Back</Link>
              </div>
              <form onSubmit={submit} encType="multipart/form-data" className='px-2 pt-2'>
                <div className="mb-3">
                  <label htmlFor='name' className="form-label mt-2">User Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Name"
                    value={name}
                    onChange={handleChange}
                    required // Added required validation
                  /> 
                </div>

                {/* <div className="mb-3">
                  <label htmlFor='image' className="form-label mt-3">Profile Image</label>
                  <input 
                    type="file" 
                    name="image" 
                    className="form-control" 
                    id="image"
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
                      const reader = new FileReader();
                      reader.onload = () => {
                        document.getElementById('image-preview').src = reader.result;
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }}
                  />
                  <img id="image-preview" className='mt-2' height='80px' width='80px' alt="Profile Preview" />
                </div> */}

                <div className="mb-3">
                  <label htmlFor='contact' className="form-label">Contact</label>
                  <input 
                    type="tel" 
                    name="contact" 
                    className="form-control" 
                    id="contact" 
                    placeholder="Contact"
                    value={contact}
                    onChange={handleChange}
                    required // Added required validation
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor='email' className="form-label">Email</label>
                  <input 
                    type="email" 
                    disabled={true} 
                    name="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="Email"
                    value={email}
                  /> 
                </div>

                <div className="mb-3">
                  <label htmlFor='password' className="form-label">Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                    disabled
                  /> 
                 <p className="mx-2 mob" style={{ fontSize: "10px" }}>*To change password kindly forget from login page</p>
                </div>

                <div className="mb-3">
                  <label className="form-label">Select Status</label>
                  <select 
                    name="status" 
                    id="status" 
                    className="form-control"
                    value={status}
                    onChange={handleChange}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                <div className="row mt-3 mb-2">
                  <div className="col-sm-6 d-grid">
                    <button type='submit' className="btn btn-primary">Update</button>
                  </div>
                  <div className="col-sm-6 d-grid">
                    <button type='reset' className="btn btn-warning">Reset</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileEdit;

import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidemenu/Sidemenu';
import '../backend.css';
import { addUserStart, registerUserStart, updateUserStart } from '../../../redux/action/user.acton'; // Ensure actions are correctly imported
import {useFormData} from '../../../hooks/useFormData'; // Assuming you have this custom hook
import {toast} from "react-toastify"

const initialState = {
  name: '', 
  status: '',
  contact: '',
  email: '',
  password: '',
  role: ''
};

function AddOrEditUser() {
  let { id } = useParams();
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    handleChange,
    formData,
    setFormData,
    buttonState,
    uploadFiles,
  ] = useFormData(initialState, 'user');

  const { name, email, contact, status, password, role } = formData;

  const submit = async (event) => {
    
    event.preventDefault();
    if (id) {
      await dispatch(updateUserStart({ ...formData, id }));
      console.log("updated user")
      
    } else {
      await dispatch(registerUserStart(formData));
      
    }
    console.error("submit hit")
    navigate('/admin/user');
  };

  const getUserById = () => {
    const user = users.find((user) => user._id === id);
    if (user) {
      setFormData(user);
    } else {
      navigate('/admin/user');
    }
  };

  useEffect(() => {
    if (id) {
      getUserById();
    }
  }, [id, users?.length, dispatch]);

  return (
    <>
      <div className="container-fluid page-header">
        <h1 className="text-center display-6">{id ? 'Edit' : "Add"} Users</h1>
      </div>
      <div className='container pt-4'>
        <div className='row'>
          <Sidebar />
          <div className="card col-9 shadow edituser">
            <div className="card-body ">
              <div className='card-header bg-dark d-flex justify-content-between'>
                <h4 className="card-title text-white fw-bold">ADD Users</h4>
                <Link to="/admin/user" className='btn btn-primary text-white button'>Back</Link>
              </div>
              <form onSubmit={submit} encType="multipart/form-data" className='p-2 mt-2'>
                <label htmlFor='name' className="form-label">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Name"
                />
{/* 
                <label htmlFor='image' className="form-label mt-3">Product Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={(e) => {
                    uploadFiles(e.target.files[0]);
                    setFormData(prevState => ({
                      ...prevState,
                      image: e.target.files[0]
                    }));
                  }}
                />
                {image && <img src={URL.createObjectURL(image)} className='mt-2' height='80px' width='80px' alt="Preview" />} */}
                <br />

                <label htmlFor='contact' className="form-label">Contact</label>
                <input
                  type="number"
                  name="contact"
                  className="form-control"
                  id="contact"
                  value={contact}
                  onChange={handleChange}
                  placeholder="Contact"
                />

                <label htmlFor='email' className="form-label mt-3">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email"
                />

                <div className='mb-3'>
                  <label htmlFor='password' className="form-label mt-3">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </div>

                <label className="form-label mt-3">Select Role</label>
                <select
                  name="role"
                  id="role"
                  className="form-control"
                  value={role}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </select>

                <label className="form-label mt-3">Select Status</label>
                <select
                  name="status"
                  id="status"
                  className="form-control"
                  value={status}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <div className="row mt-3 mb-2">
                  <div className="col-sm-6 d-grid">
                    <button type='submit' onClick={submit} className="btn btn-primary">{id ? 'UPDATE' : "ADD"}</button>
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

export default AddOrEditUser;

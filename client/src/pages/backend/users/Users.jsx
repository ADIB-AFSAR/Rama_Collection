import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidemenu/Sidemenu';
import '../backend.css';
import { getUserStart, deleteUserStart } from '../../../redux/action/user.acton'; // Import your actions
import { Spinner } from 'react-bootstrap';

function Users() {
  const users = useSelector(state => state.user.users);
  const loading = useSelector(state => state.user.loading);
   const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
    dispatch(deleteUserStart(userId)); 
    dispatch(getUserStart());
    }
  };

  useEffect(() => {
    dispatch(getUserStart());
  }, [dispatch]);

  return (
    <>
      <div className="container-fluid page-header mt-2">
        <h1 className="text-center display-6">Users</h1>
      </div>
      <div className='container pt-4'>
        <div className='row'>
          <Sidebar />
          <div className="card col-9 user shadow">
            <div className="card-body">
              <div className="card-header bg-dark d-flex justify-content-between">
                <h4 className="card-title fw-bold text-white">Users</h4>
                <Link to="create" className="btn btn-primary">Add Users</Link>
              </div>
              <div className='table-responsive'>
              {loading ?<p className='spinner-container'><Spinner animation="border" className="text-primary spinner mt-2" /></p>:<table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th> 
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope='col'>Role</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center">No users available</td>
                    </tr>
                  ) : (
                    users?.map((user, index) => (
                      <tr key={user._id}>
                        <th scope="row">{index + 1}</th>
                        {/* <td><img src={user.image || ''} alt={user.name} height="80px" /></td> */}
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.contact}</td>
                        <td>{user.role}</td>
                        <td>{user.status == "active" ? "Active" : "Disabled"}</td>
                        <td>
                          <Link to={`/admin/user/edit/${user._id}`} className='btn btn-sm btn-warning'>Edit</Link>
                          {/* <button 
                            onClick={() => handleDelete(user._id)} 
                            className='btn btn-sm btn-danger mx-1'
                          >
                            Delete
                          </button> */}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;

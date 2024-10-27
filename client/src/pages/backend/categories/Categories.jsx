import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidemenu/Sidemenu';
import '../backend.css';
import { deleteCategoryStart, getCategoryStart } from '../../../redux/action/category.action'; // Make sure these actions are imported

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const loading = useSelector((state) => state.category.loading); // Assume you have a loading state in your Redux store

  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryStart(categoryId));
    }
  };

  useEffect(() => {
    dispatch(getCategoryStart());
  }, [dispatch]);

  return (
    <> 
      <div className="container-fluid page-header mt-2">
        <h1 className="text-center display-6">Categories</h1>
      </div>
      <div className='container pt-4'>
        <div className='row'>
          <Sidebar />
          <div className="card col-9 category shadow">
            <div className="card-body">
              <div className="card-header bg-dark d-flex justify-content-between">
                <h4 className="card-title text-white fw-bold">Categories</h4>
                <Link to="create" className="btn btn-primary">Add Category</Link>
              </div>
              {loading ? (
                <div className="text-center">Loading categories...</div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      {/* <th scope="col">Image</th> */}
                      <th scope="col">Name</th>
                      <th scope="col">Status</th>
                      <th scope='col'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length > 0 ? (
                      categories.map((category, index) => (
                        <tr key={category._id}>
                          <th scope="row">{index + 1}</th>
                          {/* <td><img src={category.image || ''} alt={category.name} height={"80px"} /></td> */}
                          <td>{category.name}</td>
                          <td>{category.status ? 'ACTIVE' : 'INACTIVE'}</td>
                          <td>
                            <Link to={`/admin/category/edit/${category._id}`} className='btn btn-warning'>Edit</Link>
                            <button 
                              className='btn btn-danger mx-1' 
                              onClick={() => handleDelete(category._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">No categories found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;

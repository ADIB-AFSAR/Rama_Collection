import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidemenu/Sidemenu';
import '../backend.css';
import { deleteCategoryStart, getCategoryStart, getCategoryTreeStart } from '../../../redux/action/category.action'; // Make sure these actions are imported
import { Spinner } from 'react-bootstrap';

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.tree);
  const loading = useSelector((state) => state.category.loading);

    const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryStart(categoryId));
    }
  }
  console.log(categories)
  useEffect(() => {
    dispatch(getCategoryTreeStart());
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
                <p className='spinner-container'><Spinner animation="border" className="text-primary spinner mt-2" /></p>
              ) : (
                <table className="table">
                  <thead>
  <tr>
    <th>#</th>
    <th>Name</th>
    <th>Parent</th>
    <th>Menu</th>
    <th>Order</th>
    <th>Status</th>
    <th>Created</th>
    <th>Action</th>
  </tr>
</thead>

                  <tbody>
  {categories?.length > 0 ? (
    categories.map((parent, pIndex) => (
      <React.Fragment key={parent._id}>

        {/* ================= PARENT ================= */}
        <tr className="table-light text-white">

          <td>{pIndex + 1}</td>

          <td className="fw-bold">
            {parent.name}
          </td>

          <td>—</td>

          <td>
            {parent.showInMenu ? "✅" : "❌"}
          </td>

          <td>{parent.order ?? 0}</td>

          <td>
            {parent.status ? "ACTIVE" : "INACTIVE"}
          </td>

          <td>
            {new Date(parent.createdAt).toLocaleDateString()}
          </td>

          <td>
            <Link
              to={`/admin/category/edit/${parent._id}`}
              className="btn btn-sm btn-warning"
            >
              Edit
            </Link>
          </td>

        </tr>

        {/* ================= CHILDREN ================= */}
        {parent.children?.map((child, index) => (

          <tr key={child._id} className="bg-light">

            <td></td>

            <td className="ps-4 text-secondary">
              ↳ {child.name}
            </td>

            <td>{parent.name}</td>

            <td>
              {child.showInMenu ? "✅" : "❌"}
            </td>

            <td>{child.order ?? 0}</td>

            <td>
              {child.status ? "ACTIVE" : "INACTIVE"}
            </td>

            <td>
              {new Date(child.createdAt).toLocaleDateString()}
            </td>

            <td>
              <Link
                to={`/admin/category/edit/${child._id}`}
                className="btn btn-sm btn-warning"
              >
                Edit
              </Link>
            </td>

          </tr>

        ))}

      </React.Fragment>
    ))
  ) : (
    <tr>
      <td colSpan="8" className="text-center">
        No categories found
      </td>
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

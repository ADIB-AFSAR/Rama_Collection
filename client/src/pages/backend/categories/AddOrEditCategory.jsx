import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidemenu/Sidemenu';
import '../backend.css';
import { useDispatch, useSelector } from 'react-redux';
import { useFormData } from '../../../hooks/useFormData';
import { addCategoryStart, updateCategoryStart } from '../../../redux/action/category.action';

const initialState = {
  name: '',
  image: null,
  status: '',
};

function AddOrEditCategories() {
  let { id } = useParams();
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const [handleChange, formData, setFormData, buttonState, uploadFiles] = useFormData(initialState, 'category');
  const navigate = useNavigate();
  const { name, status, image } = formData;

  const submit = (event) => {
    event.preventDefault();
    if (id) {
      dispatch(updateCategoryStart(formData));
    } else {
      dispatch(addCategoryStart(formData));
    }
    navigate('/admin/category');
  };

  const getCategoryById = () => {
    const category = categories.find((category) => category?._id === id);
    if (category) {
      setFormData(category);
    } else {
      navigate('/admin/category');
    }
  };

  useEffect(() => {
    if (id) {
      getCategoryById();
    }
  }, [id, categories.length]);

  // Image Preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  // Update form state on input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="container-fluid page-header">
        <h1 className="text-center display-6">{id ? 'Edit' : 'Add'} Category</h1>
      </div>
      <div className='container pt-4'>
        <div className='row'>
          <Sidebar />
          <div className="card col-9 editcategory shadow">
            <div className="card-body">
              <div className='card-header bg-dark d-flex justify-content-between'>
                <h4 className="card-title text-white fw-bold">{id ? 'Edit' : 'Add'} Category</h4>
                <Link to="/admin/category" className='btn btn-primary text-white button'>Back</Link>
              </div>
              <form onSubmit={submit} encType="multipart/form-data" className='p-2'>
                <label htmlFor='name' className="form-label">Category Name</label>
                <input 
                  type="text" 
                  name="name" 
                  className="form-control mb-1" 
                  id="name" 
                  placeholder="Name" 
                  value={name} 
                  onChange={handleInputChange} 
                  required 
                />

                <label className="form-label">Category Status</label>
                <select 
                  name="status" 
                  id="status" 
                  className="form-control mb-1" 
                  value={status} 
                  onChange={handleInputChange} 
                  required
                >
                  <option value="" hidden>Select Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>

                <label htmlFor='image' className="form-label">Category Image</label>
                <input 
                  type="file" 
                  name="image" 
                  className="form-control mb-1" 
                  id="image" 
                  onChange={handleImageChange} 
                  disabled
                />
                {image && (
                  <img 
                    src={URL.createObjectURL(image)} 
                    className='mt-2' 
                    alt='Category preview' 
                    height={'80px'} 
                    width={'80px'} 
                  />
                )}

                <div className="row mt-3 mb-2">
                  <div className="col-sm-6 d-grid">
                    <button type='submit' onClick={submit} className="btn btn-primary">{id ? 'Update' : 'Add'}</button>
                  </div>
                  <div className="col-sm-6 d-grid">
                    <button type='reset' className="btn btn-warning" onClick={() => setFormData(initialState)}>Reset</button>
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

export default AddOrEditCategories;

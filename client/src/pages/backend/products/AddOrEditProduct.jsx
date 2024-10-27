import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';  
import { useDispatch, useSelector } from 'react-redux'; 
import Sidebar from '../Sidemenu/Sidemenu';
import { useFormData } from '../../../hooks/useFormData'; // Assuming you have a custom hook for form management
import { updateProductStart, addProductStart } from '../../../redux/action/product.action'; // Import your action creators
import {getCategoryStart} from '../../../redux/action/category.action'
import '../backend.css';

const initialState = {
  name: '',
  images: [],
  status: '',
  description: '',
  category: '',
  price: 0,
  slug: '',
  quantity: 0,
};

function AddOrEditProducts() {
  const products = useSelector(state => state.product.products);
  const categories = useSelector(state => state.category.categories);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [handleChange,
    formData,
    setFormData,
    buttonState,
    uploadFiles] = useFormData(initialState, 'product');

  const { name, images, status, description, category, price, slug, quantity } = formData;

  const getProductById = () => {
    const product = products.find((product) => product?._id === id);
    console.log("fetched:",product)
    if (product) {
      setFormData({ ...product, category: product?.category?._id });
    } else {
      navigate('/admin/product');
    }
  };

  const submit = (event) => {
    event.preventDefault();
    console.log(formData);
    if (id) {
      console.log("update start")
      dispatch(updateProductStart(formData));
    } else {
      console.log("add start")
      dispatch(addProductStart(formData));
    }
    setTimeout(() => {
      navigate('/admin/product');
    }, 800);
  };

  useEffect(() => {
    if (id) {
      getProductById();
    }
    dispatch(getCategoryStart());
  }, [id, dispatch]);

  return (
    <> 
      <div className="container-fluid page-header">
        <h1 className="text-center display-6">{id ? 'Edit' : "Add"} Product</h1>
      </div>    
      <div className='container pt-4'>
        <div className='row'>
          <Sidebar />
          <div className="card col-9 editproduct shadow">
            <div className="card-body">
              <div className='card-header bg-dark d-flex justify-content-between'>
                <h4 className="card-title text-white fw-bold">{id ? 'Edit' : "Add"} Product</h4>
                <Link to="/admin/product" className='btn btn-primary text-white'>Back</Link>
              </div>
              <form onSubmit={submit} encType="multipart/form-data" className='px-2 mt-2 col-12'>
                <label htmlFor='name' className="form-label">Product Name</label>
                <input 
                  type="text" 
                  name="name"  
                  className="form-control col-8" 
                  id="name" 
                  placeholder="Name"
                  value={name}
                  onChange={handleChange} 
                  required
                />

                <label htmlFor='slug' className="form-label mt-3">Slug Name</label>
                <input 
                  type="text" 
                  name="slug"    
                  className="form-control"  
                  id="slug" 
                  placeholder="Slug"
                  value={slug}
                  onChange={handleChange} 
                  required
                />

<label htmlFor='images'  className="form-label mt-3"> Product Image</label>
    <input multiple type="file" name="images" onChange={uploadFiles} className="form-control" id="images"/>
    {images && images?.map((image,index)=>{
      return <img key={index} src={process.env.REACT_APP_API_URL + image}  className='mt-2 mb-2' height={'120px'} width={'100px'}/>
    }) }
<br></br>
                <label htmlFor='description' className="form-label mt-3">Description</label>
                <textarea 
                  name="description" 
                  rows={6}   
                  className="form-control"  
                  id="description" 
                  placeholder="Description"
                  value={description}
                  onChange={handleChange} 
                /> 

                <label htmlFor='price' className="form-label mt-3">Price</label>
                <input 
                  type="number" 
                  step='any'  
                  name="price"   
                  className="form-control"  
                  id="price" 
                  placeholder="Price"
                  value={price}
                  onChange={handleChange}
                  required={true} 
                />

                <label htmlFor='quantity' className="form-label mt-3">Quantity Adding</label>
                <input 
                  type="number"  
                  step='any' 
                  name="quantity"   
                  className="form-control" 
                  id="quantity" 
                  placeholder="Quantity"
                  value={quantity}
                  onChange={handleChange} 
                  required={true}
                />

                <label htmlFor='category' className="form-label mt-3">Product Category</label>
                <select 
                   required
                  name="category" 
                  id="category" 
                  className="form-control"
                  value={category}
                  onChange={handleChange} 
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <label className="form-label mt-3">Status</label>
                <select 
                  name="status" 
                  className="form-control"
                  value={status}
                  onChange={handleChange} 
                >
                  <option value="" disabled>Select Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
                <button type="submit" className='btn btn-primary mt-4 text-center mx-1 col-5'>{id ? 'Update' : "Add"}</button>
                <button type="reset" className='btn btn-warning mt-4 text-center mx-1 col-5'>Reset</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddOrEditProducts;

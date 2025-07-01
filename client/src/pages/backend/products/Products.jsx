import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux'; 
import Sidebar from '../Sidemenu/Sidemenu'; 
import '../backend.css'; 
import { deleteProductStart, getProductStart } from '../../../redux/action/product.action';
import { Spinner } from 'react-bootstrap';

function Products() {
  const products = useSelector(state => state.product?.products);
  const [loading , setLoading] = useState(false)
  const dispatch = useDispatch();
  console.log(products[31].enableSize)

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")){
      dispatch(deleteProductStart(productId));
      dispatch(getProductStart());
    }
  }

  useEffect(() => {
    setLoading(true)
    dispatch(getProductStart());   
    setTimeout(()=>{setLoading(false)},3000)
  }, [dispatch]);

  return (
    <>
      <div className="container-fluid page-header mt-2">
        <h1 className="text-center display-6">Products</h1>
      </div>    
      <div className='container pt-4'>
        <div className='row'>
          <Sidebar />
          <div className="card col-9 shadow product">
            <div className="card-body">
              <div className="card-header bg-dark d-flex justify-content-between">
                <h4 className="card-title text-white fw-bold">Products</h4>
                <Link to="create" className="btn btn-primary">Add Product</Link>
              </div>
              <div className='table-responsive '>
              { loading ? <p className='spinner-container'><Spinner animation="border" size="sm" className="text-primary spinner mt-2" /></p> : <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col-lg" className='text-center'>Image</th>
                    <th scope="col" className='text-center'>Name</th>
                    <th scope="col" className='text-center'>Price</th>
                    <th scope="col" className='text-center'>Stock</th>
                    <th scope="col" className='text-center' >Size</th>
                    <th scope='col' className='text-center'>Category</th>
                    <th scope="col" className='text-center'>Status</th>
                    <th scope='col' className='text-center'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center">No products found</td>
                    </tr>
                  ) : (
                    products?.map((product, index) => (
                      <tr key={product?._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{product?.images?.length > 0 ?product?.images.map((url,index)=>{
                          return<img className='p-0 m-0' height={"60px"} key={index} src={url} alt={product?.name} />
                        }):<img  src={''} alt={product?.name} height={"80px"} />}</td>
                        <td>{product?.name}</td>
                        <td>₹{product?.price}</td>
                        <td className='text-center'>{product?.quantity}</td>
                        <td className='text-center'>
  {product?.enableSize ? (
    product?.sizes?.length > 0 ? product.sizes.join(', ') : 'No Sizes'
  ) : (
    'Disabled'
  )}
</td>

                        <td className='text-center'>{product?.category?.name ?? "N/A"}</td>
                        <td>{product?.status === true ? 'Active' : 'Inactive'}</td>
                        <td>
                          <Link to={`/admin/product/edit/${product?._id}`} className='btn btn-warning my-1 btn-sm' style={{width:'4rem'}}>Edit</Link>
                          {/* <button onClick={() => handleDelete(product?._id)} className='btn btn-danger mx-1 btn-sm'>Delete</button> */}
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

export default Products;

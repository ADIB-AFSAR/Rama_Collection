import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { addCartStart, deleteCartStart, getCartStart, updateCartStart } from '../../redux/action/cart.action';
import useCart from '../../hooks/useCart';
import { Button, Image, ListGroup, Form } from 'react-bootstrap';
import './frontend.css'; // Custom CSS for CartSidebar

const CartSidebar = ({ cartSidebarOpen, toggleCartSidebar }) => {

  const currentUser = useSelector(state=>state.user.currentUser)
   const dispatch = useDispatch()
  const [,updateCart , deleteCart] = useCart()
  const currentCart = useSelector(state => state.cart.currentCart)
  const [quantities, setQuantities] = useState(currentCart?.items?.map(item => item.quantity))
  const item = currentCart?.items ? currentCart.items.map(item => item) : [];
 
 
  const handleClickIncrease = (index, item) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = (updatedQuantities[index] || 0) + 1;
    setQuantities(updatedQuantities);
    dispatch(updateCartStart({ itemId: item._id, quantity: updatedQuantities[index], cartId: currentCart._id }));
    console.log("Updated Quantities:", updatedQuantities[index], typeof updatedQuantities[index]);

};

const handleClickDecrease = (index, item) => {
    if (quantities[index] > 1) {
        const updatedQuantities = [...quantities];
        updatedQuantities[index] = Math.max(1, (updatedQuantities[index] || 0) - 1);
        setQuantities(updatedQuantities);
        dispatch(updateCartStart({ itemId: item._id, quantity: updatedQuantities[index], cartId: currentCart._id }));
        console.log("Updated Quantities:", updatedQuantities[index], typeof updatedQuantities[index]);

    }
};

  const handleDelete = (item)=>{
    localStorage.removeItem(`cart-${item.product._id}`);
    dispatch(deleteCartStart(item._id))
    dispatch(getCartStart())
  
   }
  
  useEffect(()=>{
    if (currentCart?.items) {
      setQuantities(currentCart.items.map(item => item.quantity || 1));
  }
      console.log(item)
  //   if(!currentUser.name){
  //      navigate('/login')
  // }
  },[currentUser.name , currentCart.items?.length])
  return (
    <>
      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${cartSidebarOpen ? 'active' : ''} d-flex row`}>
        <span className='mx-2'>
        <span className='bag '>
        <div className="cart-header bg-white">
          <h2 className='fw-normal'>BAG<span><Button variant="close" className="float-end px-3" onClick={toggleCartSidebar}></Button></span></h2>
         <hr></hr> 
        </div></span>
        {currentUser?.name && Array.isArray(currentCart?.items) && currentCart?.items?.length > 0 ? currentCart?.items?.map((item,index)=>{
          const imageSrc = item?.product?.images && item?.product?.images.length > 0 
                ? item?.product?.images[0] 
                : '/images/loading.png';
            return<ListGroup variant="flush">
                      <ListGroup.Item className="cart-item d-flex col">
                        <Image 
                          src={imageSrc}
                          alt="Dark Blue Stitchless Polo T-Shirt"
                          thumbnail
                           className='col-4'
                        />
                        <div className="cart-item-details col-8">
                          <h5 className='fs-6'>{item?.product?.name}</h5> 
                          <p className='fw-normal text-end'><button style={{cursor:"pointer"}}><i onClick={()=>{handleDelete(item)}} className='bi bi-trash float-end px-3'></i></button></p>
                          <span className='d-flex justify-content-between col'>
                          <Form.Group className="input-group w-50">
                            <Button className='btn btn-sm' onClick={()=>handleClickDecrease(index,item)} variant="outline-secondary">-</Button>
                            <Form.Control type="text" className="text-center mx-0 px-0 border-0" value={quantities[index] || 1} />
                            <Button className='btn btn-sm' onClick={()=>handleClickIncrease(index,item)} variant="outline-secondary">+</Button>             
                          </Form.Group> <span className="cart-item-price fw-normal">INR {item?.product?.price}</span>
                          </span>
                        </div>
                        
                      </ListGroup.Item>
                    </ListGroup>
        }):<h3 className=' d-flex justify-content-center align-items-center mt-5 text-center mt-2'>{!currentUser?.name ? <a href='/login' className='text-decoration-none text-dark'>Click here to login</a>:"Your bag is empty"}</h3>} 
        </span>


       {currentUser?.name && currentCart?.items?.length > 0 && <div className='total px-3'>
        <div className="subtotal d-flex justify-content-between mt-4">
          <span className='fw-normal px-2'>SUBTOTAL</span>
          <span className='fw-normal fs-6 px-2'>₹ {currentCart.subTotal || 0}</span>
        </div>

        <p className='d-flex justify-content-between m-0 py-0 px-2'><span>Shipping Charges</span><span className='fw-semibold small'>FREE</span></p>
        <p className='d-flex justify-content-between px-2'><span>Tax</span><span>₹0</span></p>
        <h4 className='d-flex justify-content-between fw-semibold px-2'><span>Grand Total</span><span>₹{currentCart?.grandTotal || 0}</span></h4>

        <Button variant="dark" className="checkout-btn col mb-3">
          <a className='text-decoration-none text-white' href={'/checkout'}>PROCEED TO CHECKOUT</a>
        </Button>
        </div>} 
      </div>  
      

      {/* Blur and Overlay for main content */}
      {cartSidebarOpen && <div className="overlay" onClick={toggleCartSidebar}></div>}
    </>
  );
};

export default CartSidebar;

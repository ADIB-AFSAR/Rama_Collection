import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Image, ListGroup, Form, Spinner } from 'react-bootstrap';
import { addCartStart, deleteCartStart, getCartStart, updateCartStart } from '../../redux/action/cart.action';
import debounce from 'lodash/debounce';
import { useCallback } from 'react';
import useCart from '../../hooks/useCart';
import './frontend.css';  
const CartSidebar = ({ cartSidebarOpen, toggleCartSidebar }) => {

  const currentUser = useSelector(state => state.user.currentUser);
  const iscartopen = useSelector(state => state.cart.isCartOpen)
  const dispatch = useDispatch();
  const [, updateCart, deleteCart] = useCart();
  const currentCart = useSelector(state => state.cart.currentCart || []);
const [quantities, setQuantities] = useState([]);
  const [isGrandTotalLoading, setIsGrandTotalLoading] = useState(false); // State to manage loader for Grand Total
  const [isDeleting, setIsDeleting] = useState(false); // State to manage loader for Deleting items
  
  const item = currentCart?.items ? currentCart.items.map(item => item) : [];

  const debouncedUpdate = useCallback(
  debounce((itemId, quantity, cartId) => {
    dispatch(updateCartStart({ itemId, quantity, cartId }));
  }, 300),
  []
);

  // Function to handle the increase in quantity
  const handleClickIncrease = (index, item) => {
  const updatedItems = [...currentCart.items];
  const newQuantity = (updatedItems[index].quantity || 1) + 1;
  updatedItems[index] = { ...updatedItems[index], quantity: newQuantity };

  const subTotal = updatedItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const grandTotal = subTotal;

  const updatedCart = {
    ...currentCart,
    items: updatedItems,
    subTotal,
    grandTotal,
  };

  dispatch({ type: 'SET_CART', payload: updatedCart });

  debouncedUpdate(item._id, newQuantity, currentCart._id);
};


   // Function to handle the decrease in quantity
  const handleClickDecrease = (index, item) => {
  if ((item.quantity || 1) > 1) {
    const updatedItems = [...currentCart.items];
    const newQuantity = Math.max(1, (updatedItems[index].quantity || 1) - 1);
    updatedItems[index] = { ...updatedItems[index], quantity: newQuantity };

    const subTotal = updatedItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const grandTotal = subTotal;

    const updatedCart = {
      ...currentCart,
      items: updatedItems,
      subTotal,
      grandTotal,
    };

    dispatch({ type: 'SET_CART', payload: updatedCart });

debouncedUpdate(item._id, newQuantity, currentCart._id);
}
};
// Function to handle item deletion with a loader
  const handleDelete = (item) => {
    setIsDeleting(item._id); // Set the ID of the item being deleted
  
    // Simulate a delay (replace this with actual async action)
     
      localStorage.removeItem(`cart-${item.product._id}`);
      const updatedItems = currentCart.items.filter(i => i._id !== item._id);
const updatedCart = {
  ...currentCart,
  items: updatedItems,
  subTotal: updatedItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  grandTotal: updatedItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
};

dispatch({ type: 'SET_CART', payload: updatedCart });
dispatch(deleteCartStart(item._id));

// Optional: refetch from server later if needed
setTimeout(() => {
  dispatch(getCartStart());
  setIsDeleting(null);
}, 500);

  };

  const handleCloseCart = () => {
  dispatch({ type: 'TOGGLE_CART' });
};
 
  // Use effect to simulate loading of Grand Total
 useEffect(() => {
  if (currentCart?.items) {
    setQuantities(currentCart.items.map(item => item.quantity || 1));
  }
}, []);
 //   if (!currentCart || !Array.isArray(currentCart.items)) {
//   return (
//   <div className="d-flex justify-content-center align-items-center mt-5">
//     <Spinner animation="border" variant="dark" />
//   </div>
// );
// }

// if (currentCart.items.length === 0) {
//   return <></>;
// }

  return (
    <>
      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${iscartopen ? 'active' : ''} d-flex row`}>
        <span className='mx-2'>
          <span className='bag'>
            <div className="cart-header bg-white">
              <h2 className='fw-normal'>BAG<span><Button variant="close" className="float-end px-3" onClick={handleCloseCart}></Button></span></h2>
              <hr></hr>
            </div>
          </span>

          {currentUser?.name && Array.isArray(currentCart?.items) && currentCart.items.length > 0 ? (
            currentCart?.items?.map((item, index) => {
              const imageSrc = Array.isArray(item?.product?.images) && item?.product?.images.length > 0
            ? item.product.images[0]
            : '/images/loading.png';
              return (
                <ListGroup variant="flush" key={item._id}>
                  <ListGroup.Item className="cart-item d-flex col">
                    <Image 
                      src={imageSrc}
                      alt="Product Image"
                      thumbnail
                      className='col-4'
                    />
                    <div className="cart-item-details col-8">
                      <h5 className='fs-6'>{item?.product?.name}</h5>
                      <p className='fw-normal text-end d-flex justify-content-between'>
                      <span className="cart-item-price fw-semibold">INR {item?.product?.price}</span> 
                      
                        {/* Show delete button with loader */}
                        <button
              style={{cursor:"pointer" ,width : "6rem"}}
              className='bg-white bin'
              onClick={() => handleDelete(item)}
              disabled={isDeleting === item._id} // Disable the button if it's being deleted
            >
              {isDeleting === item._id ? ( // Show loader only for the clicked item
                <Spinner animation="border" size="sm" />
              ) : (
                <i className='bi bi-trash float-end px-3'></i>
              )}
            </button>
                      </p>
                      {item?.size && <p className='fw-semibold'>Size :{item?.size}</p>}
                      <span className="d-flex justify-content-between col quan-control flex-wrap">
                        <Form.Group className="input-group">
                          <Button disabled={isGrandTotalLoading} className='btn btn-sm quan' onClick={() => handleClickDecrease(index, item)} variant="outline-secondary">-</Button>
                          <Form.Control type="text" className="text-center mx-0 px-0 border-0 num" value={item.quantity ?? 1} readOnly/>
                          <Button disabled={isGrandTotalLoading} className='btn btn-sm quan' onClick={() => handleClickIncrease(index, item)} variant="outline-secondary">+</Button>
                        </Form.Group>
                      </span>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              );
            })
          ) : (
            <h3 className='d-flex justify-content-center align-items-center mt-5 text-center mt-2'>
              {!currentUser?.name ? <a href='/login' className='text-decoration-none text-dark'>Click here to login</a> : "Your bag is empty"}
            </h3>
          )}
        </span>

        {currentUser?.name && currentCart?.items?.length > 0 && (
          <div className='total px-3' style={{zIndex:'1000'}}>
            <div className="subtotal d-flex justify-content-between mt-4">
              <span className='fw-normal px-2'>SUBTOTAL</span>
              <span className='fw-normal fs-6 px-2'> {isGrandTotalLoading ? (
                  "-" // Loader while calculating grand total
                ) : (
                  `₹${currentCart?.subTotal || 0}` // Display grand total when available
                )}</span>
            </div>
            <p className='d-flex justify-content-between m-0 py-0 px-2'>
              <span>Shipping Charges</span>
              <span className='fw-semibold small'>FREE</span>
            </p>
            <p className='d-flex justify-content-between px-2'>
              <span>Tax</span><span>₹0</span>
            </p>

            <h4 className='d-flex justify-content-between fw-semibold px-2'>
              <span>Grand Total</span>
              <span>
                
                  {`₹${currentCart?.grandTotal || 0}`} 
      
              </span>
            </h4>

            <Button variant="dark" className="checkout-btn col mb-3">
              <a className='text-decoration-none text-white' href="/checkout">
                PROCEED TO CHECKOUT
              </a>
            </Button>
          </div>
        )}
      </div>

      {/* Blur and Overlay for main content */}
      {cartSidebarOpen && <div className="overlay" onClick={handleCloseCart}></div>}
    </>
  );
};

export default CartSidebar;

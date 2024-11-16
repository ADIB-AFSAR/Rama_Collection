import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Image, ListGroup, Form, Spinner } from 'react-bootstrap';
import { addCartStart, deleteCartStart, getCartStart, updateCartStart } from '../../redux/action/cart.action';
import useCart from '../../hooks/useCart';
import './frontend.css'; // Custom CSS for CartSidebar

const CartSidebar = ({ cartSidebarOpen, toggleCartSidebar }) => {

  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const [, updateCart, deleteCart] = useCart();
  const currentCart = useSelector(state => state.cart.currentCart || []);
  const [quantities, setQuantities] = useState(currentCart?.items?.map(item => item.quantity));
  const [isGrandTotalLoading, setIsGrandTotalLoading] = useState(false); // State to manage loader for Grand Total
  const [isDeleting, setIsDeleting] = useState(false); // State to manage loader for Deleting items

  const item = currentCart?.items ? currentCart.items.map(item => item) : [];

  // Function to handle the increase in quantity
  const handleClickIncrease = (index, item) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = (updatedQuantities[index] || 0) + 1;
    
    // Immediately show the loader for grand total
    setIsGrandTotalLoading(true);

    setQuantities(updatedQuantities);
    dispatch(updateCartStart({ itemId: item._id, quantity: updatedQuantities[index], cartId: currentCart._id }));
  };

  // Function to handle the decrease in quantity
  const handleClickDecrease = (index, item) => {
    if (quantities[index] > 1) {
      const updatedQuantities = [...quantities];
      updatedQuantities[index] = Math.max(1, (updatedQuantities[index] || 0) - 1);
      
      // Immediately show the loader for grand total
      setIsGrandTotalLoading(true);

      setQuantities(updatedQuantities);
      dispatch(updateCartStart({ itemId: item._id, quantity: updatedQuantities[index], cartId: currentCart._id }));
    }
  };

  // Function to handle item deletion with a loader
  const handleDelete = (item) => {
    setIsDeleting(item._id); // Set the ID of the item being deleted
  
    // Simulate a delay (replace this with actual async action)
    setTimeout(() => {
      localStorage.removeItem(`cart-${item.product._id}`);
      dispatch(deleteCartStart(item._id));
      dispatch(getCartStart());
  
      // After deletion process, reset the deleting item ID
      setIsDeleting(null);
    }, 3000); // Simulating a delay for deletion process (replace with real async call)
  };
  

  // Use effect to simulate loading of Grand Total
  useEffect(() => {
    if (currentCart?.items) {
      setQuantities(currentCart.items.map(item => item.quantity || 1));
      
      // Simulate loading of grand total for demonstration purposes
      setTimeout(() => {
        setIsGrandTotalLoading(false); // Hide loader after a short delay (to simulate a network request)
      }, 500); // In a real case, replace this with an actual API call or calculation logic
    }
  }, [currentCart?.items]);

  // Check if currentCart exists and has items before rendering
  if (!currentCart || currentCart.length === 0) {
    return <p>No items in cart</p>;
  }

  return (
    <>
      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${cartSidebarOpen ? 'active' : ''} d-flex row`}>
        <span className='mx-2'>
          <span className='bag'>
            <div className="cart-header bg-white">
              <h2 className='fw-normal'>BAG<span><Button variant="close" className="float-end px-3" onClick={toggleCartSidebar}></Button></span></h2>
              <hr></hr>
            </div>
          </span>

          {currentUser?.name && Array.isArray(currentCart?.items) && currentCart?.items?.length > 0 ? (
            currentCart?.items?.map((item, index) => {
              const imageSrc = item?.product?.images && item?.product?.images.length > 0 
                ? item?.product?.images[0] 
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
              style={{cursor:"pointer"}}
              className='bg-white'
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
                      <span className='d-flex justify-content-between col'>
                        <Form.Group className="input-group w-50">
                          <Button disabled={isGrandTotalLoading} className='btn btn-sm' onClick={() => handleClickDecrease(index, item)} variant="outline-secondary">-</Button>
                          <Form.Control type="text" className="text-center mx-0 px-0 border-0" value={quantities[index] || 1} />
                          <Button disabled={isGrandTotalLoading} className='btn btn-sm' onClick={() => handleClickIncrease(index, item)} variant="outline-secondary">+</Button>
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
                {isGrandTotalLoading ? (
                  <Spinner animation="border" size="sm" /> // Loader while calculating grand total
                ) : (
                  `₹${currentCart?.grandTotal || 0}` // Display grand total when available
                )}
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
      {cartSidebarOpen && <div className="overlay" onClick={toggleCartSidebar}></div>}
    </>
  );
};

export default CartSidebar;

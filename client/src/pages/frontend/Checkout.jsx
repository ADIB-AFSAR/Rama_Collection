import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormData } from '../../hooks/useFormData'
import { placeOrderStart } from '../../redux/action/order.action'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Stripe from "react-stripe-checkout"
import { getToken } from "../../redux/service/token.service";
import { Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'

const initialState = {
  name :'',
  email:'',
  companyName : '',
  address : '',
  city : '',
  state : '',
  country : '',
  zipCode : '',
  contact : '',
  payment : 'cod'
}


function Checkout() {
  const currentCart = useSelector(state=>state.cart.currentCart)
  const currentUser = useSelector(state=>state.user.currentUser)
  const [handleChange,formData,setFormData,,,] = useFormData(initialState,'');
  const { name,email,companyName,address,city,state,country,zipCode,contact,payment} = formData
 const navigate = useNavigate()
 const dispatch = useDispatch()

 const [showModal, setShowModal] = useState(false);
 const [screenshot, setScreenshot] = useState(null);
 const [loading, setLoading] = useState(false); // State for the loader

  
 const handleSubmit = async (event) => {
    setLoading(true); // Start the loader when the form is submitted
    event.preventDefault();
    const orderPlaced = { cartId: currentCart._id, billingAddress: formData };  
    setTimeout(() => {
        dispatch(placeOrderStart(orderPlaced));    
        setLoading(false); // Stop the loader after the order is placed
        navigate("/thankyou");
        deleteCartDataFromLocalStorage() 
    }, 3000);
    
  };

  const handleUPISubmit = async (event) => {
    setLoading(true); // Start the loader when the button is clicked
    const NewFormData = new FormData(); 
    NewFormData.append("billingAddress", JSON.stringify(formData)); // Stringify the form data
    NewFormData.append("image", screenshot); // Attach file
     NewFormData.append(
        "orderDetails",
        JSON.stringify({
      user: { userID : currentUser?.id , name, email },
      order: currentCart,
    })
  );
    console.log("formData:",[...NewFormData.entries()])
    try {
        await axios.post(
            `${process.env.REACT_APP_API_URL}/api/cart/stripe-pay`, 
            NewFormData, // Form data is the second parameter
            {
              headers: {
                "Authorization": getToken(),
                "Content-Type": "multipart/form-data",
              }
            }
          );
      handleSubmit(event)
    } catch (error) {
      console.error("Error sending email:", error.message);
      setLoading(false); // Stop the loader in case of an error
    }
  };
  useEffect(()=>{
    console.log(currentCart)
    if(!currentUser.name){
       navigate('/login')
  }
  
  setFormData((preValue)=>({
    ...preValue,
    name:currentUser.name,
    contact :currentUser.contact,
    email : currentUser.email
   }))
 
  },[currentUser.name , ])

  const deleteCartDataFromLocalStorage = () => {
    const keysToRemove = [];

    // Identify all keys in localStorage that start with "cart-"
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("cart-")) {
            keysToRemove.push(key);
        }
    }

    // Remove each identified key
    keysToRemove.forEach((key) => {
        localStorage.removeItem(key);
    });

    console.log("All cart-related data removed from localStorage.");
};
  
  return (
    <>
     <a onClick={() => window.history.back()}>
        <i
          style={{ cursor: 'pointer', left: '5%' }}
          className="bi bi-arrow-left fs-3 text-dark position-absolute "
        ></i>
      </a>
        <div className="container-fluid checkout-header text-center">
  <h1 className="display-5 fw-bold text-dark">Checkout</h1>
</div>
        <div className="container-fluid py-5">
            <div className="container py-5">
                <h1 className="mb-4">Billing details</h1>
                <form encType='multipart/form-data' className="checkout-form" onSubmit={(event) => { event.preventDefault(); handleSubmit(event); }}>
                    <div className="row g-5">
                       <div className="col-md-12 col-lg-6 col-xl-7">
  <div className="row">
    <div className="col-md-12">
      <label className="form-label fw-semibold">Name <sup className="text-danger">*</sup></label>
      <div className="input-group">
        <span className="input-group-text bg-light">
          <i className="bi bi-person-fill"></i>
        </span>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={name}
          className="form-control rounded-end"
          placeholder="Full Name"
          required
        />
      </div>
    </div>
  </div>

  <div className="row g-4 mt-1">
    <div className="col-md-12">
      <label className="form-label fw-semibold">Address <sup className="text-danger">*</sup></label>
      <div className="input-group">
        <span className="input-group-text bg-light">
          <i className="bi bi-geo-alt-fill"></i>
        </span>
        <input
          type="text"
          className="form-control rounded-end"
          placeholder="House Number, Street Name"
          name="address"
          value={address}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <div className="col-md-6">
      <label className="form-label fw-semibold">Town/City <sup className="text-danger">*</sup></label>
      <div className="input-group">
        <span className="input-group-text bg-light">
          <i className="bi bi-buildings-fill"></i>
        </span>
        <input
          type="text"
          className="form-control rounded-end"
          name="city"
          value={city}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <div className="col-md-6">
      <label className="form-label fw-semibold">State <sup className="text-danger">*</sup></label>
      <div className="input-group">
        <span className="input-group-text bg-light">
          <i className="bi bi-map-fill"></i>
        </span>
        <input
          type="text"
          className="form-control rounded-end"
          name="state"
          value={state}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <div className="col-md-6">
      <label className="form-label fw-semibold">Country <sup className="text-danger">*</sup></label>
      <div className="input-group">
        <span className="input-group-text bg-light">
          <i className="bi bi-globe2"></i>
        </span>
        <input
          type="text"
          className="form-control rounded-end"
          name="country"
          value={country}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <div className="col-md-6">
      <label className="form-label fw-semibold">Postcode/Zip <sup className="text-danger">*</sup></label>
      <div className="input-group">
        <span className="input-group-text bg-light">
          <i className="bi bi-mailbox"></i>
        </span>
        <input
          type="text"
          className="form-control rounded-end"
          name="zipCode"
          value={zipCode}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <div className="col-md-6">
      <label className="form-label fw-semibold">Mobile <sup className="text-danger">*</sup></label>
      <div className="input-group">
        <span className="input-group-text bg-light">
          <i className="bi bi-telephone-fill"></i>
        </span>
        <input
          type="tel"
          className="form-control rounded-end"
          name="contact"
          value={contact}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <div className="col-md-6">
      <label className="form-label fw-semibold">Email Address <sup className="text-danger">*</sup></label>
      <div className="input-group">
        <span className="input-group-text bg-light">
          <i className="bi bi-envelope-fill"></i>
        </span>
        <input
          type="email"
          className="form-control rounded-end"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  </div>
</div>

                       <div className="col-md-12 col-lg-6 col-xl-5">
  <div className="table-responsive">
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Products</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        {currentCart.items?.length > 0 ? (
          currentCart.items.map((item, index) => (
            <tr key={index}>
              <th scope="row">
                <div className="d-flex align-items-center mt-2">
                  <img
                    src={item.product.images[0]}
                    className="img-fluid rounded"
                    style={{ width: "90px", height: "90px" }}
                    alt={item.product.name}
                  />
                </div>
              </th>
              <td className="py-5 small">{item.product.name}</td>
              <td className="py-5">₹{item.product.price}</td>
              <td className="py-5">{item.quantity}</td>
              <td className="py-5">₹{+item.product.price * item.quantity}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center py-4 fw-semibold text-muted">No Items in Cart!</td>
          </tr>
        )}

        <tr>
          <td colSpan="3"></td>
          <td className="py-5">
            <p className="mb-0 text-dark py-3">Subtotal</p>
          </td>
          <td className="py-5">
            <div className="py-3 border-bottom border-top">
              <p className="mb-0 text-dark">₹{currentCart.subTotal || 0}</p>
            </div>
          </td>
        </tr>

        <tr>
          <td colSpan="1"></td>
          <td className="py-5">
            <p className="mb-0 text-dark py-4">Tax</p>
          </td>
          <td colSpan="3" className="py-5">
            <div className="py-3 border-bottom border-top">
              <p className="mb-0 text-dark text-end">₹{currentCart.tax || 0}</p>
            </div>
          </td>
        </tr>

        <tr>
          <td colSpan="1"></td>
          <td className="py-5">
            <p className="mb-0 text-dark text-uppercase py-3">Total</p>
          </td>
          <td colSpan="2"></td>
          <td className="py-5">
            <div className="py-3 border-bottom border-top">
              <p className="mb-0 text-dark">₹{currentCart.grandTotal || 0}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  {/* Payment Method */}
  <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
    <div className="col-12">
      <div className="form-check text-start my-3">
        <input
          type="radio"
          className="form-check-input bg-primary border-0"
          checked={payment === 'cod'}
          id="cod"
          onChange={handleChange}
          name="payment"
          value="cod"
        />
        <label className="form-check-label" htmlFor="cod">
          Cash On Delivery
        </label>
      </div>

      <div className="form-check text-start my-3">
        <input
          type="radio"
          className="form-check-input bg-primary border-0"
          checked={payment === 'upi'}
          id="upi"
          onChange={handleChange}
          name="payment"
          value="upi"
        />
        <label className="form-check-label" htmlFor="upi">
          Pay via UPI
        </label>
      </div>
    </div>
  </div>

  {/* Submit Button */}
  <button
    type={payment === "upi" ? "button" : "submit"}
    onClick={(event) => payment === "upi" ? setShowModal(true) : handleSubmit(event)}
    className="btn border-secondary py-2 px-2 w-100 text-primary"
  >
    {payment === "upi"
      ? "Proceed to Pay"
      : loading
      ? "Processing..."
      : "Place Order"}
  </button>

  {/* Optional: Stripe Payment Code Block (Commented) */}
  {/* 
  <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
    <div className="col-12">
      <div className="form-check text-start my-3">
        <input
          type="radio"
          className="form-check-input bg-primary border-0"
          checked={payment === 'stripe'}
          id="stripe"
          onChange={handleChange}
          name="payment"
          value="stripe"
        />
        <label className="form-check-label" htmlFor="stripe">
          Pay with Stripe
        </label>
      </div>
    </div>
  </div>

  <div className="row g-4 text-center align-items-center justify-content-center pt-4">
    {payment === "stripe" ? (
      <Stripe stripeKey={process.env.REACT_APP_STRIPE_KEY} />
    ) : (
      <button
        type="submit"
        onClick={submit}
        className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
      >
        Place Order
      </button>
    )}
  </div>
  */}
</div>

                    </div>
                </form>
                {/* {loading && <div className="loader">Placing your order...</div>} */}
            </div>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Pay via UPI</Modal.Title>
  </Modal.Header>

  <Modal.Body className="modal-style">
    <img
      src="/images/paymnet-QR.jpg"
      alt="Scan this UPI QR Code to pay"
      className="img-fluid img mb-3"
    />

    <Form.Group controlId="paymentScreenshot" className="mt-3">
      <Form.Label className="fw-semibold">Upload Screenshot of Payment</Form.Label>
      <Form.Control
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => setScreenshot(e.target.files[0])}
      />
    </Form.Group>
  </Modal.Body>

  <Modal.Footer>
    <Button
      variant="primary"
      onClick={handleUPISubmit}
      className="w-100 d-flex justify-content-center align-items-center"
      disabled={loading}
    >
      {loading ? (
        <>
          <Spinner animation="border" size="sm" role="status" className="me-2" />
          Processing...
        </>
      ) : (
        "Submit Payment"
      )}
    </Button>
  </Modal.Footer>
</Modal>

    </>
  )
}

export default Checkout
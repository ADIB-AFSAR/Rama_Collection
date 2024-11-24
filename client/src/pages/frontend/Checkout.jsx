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
  
 const handleSubmit = async (event) => {
    event.preventDefault();
     const orderPlaced = { cartId: currentCart._id, billingAddress: formData };
    dispatch(placeOrderStart(orderPlaced));
    navigate("/thankyou");
  };

  const handleUPISubmit = async () => {
    const NewFormData = new FormData(); 
    NewFormData.append("billingAddress", JSON.stringify(formData)); // Stringify the form data
    NewFormData.append("image", screenshot); // Attach file
    NewFormData.append("userID", currentUser?.id); // Attach file
    NewFormData.append(
        "orderDetails",
        JSON.stringify({
      user: { name, email },
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
      handleSubmit()
    } catch (error) {
      console.error("Error sending email:", error.message);
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

  
  return (
    <>
     <a onClick={() => window.history.back()}>
        <i
          style={{ cursor: 'pointer', left: '5%' }}
          className="bi bi-arrow-left fs-3 text-dark position-absolute "
        ></i>
      </a>
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-dark display-6">Checkout</h1>
        </div>
        <div className="container-fluid py-5">
            <div className="container py-5">
                <h1 className="mb-4">Billing details</h1>
                <form encType='multipart/form-data' onSubmit={(event) => { event.preventDefault(); handleSubmit(event); }}>
                    <div className="row g-5">
                        <div className="col-md-12 col-lg-6 col-xl-7">
                            <div className="row">
                                <div className="col-md-12 col-lg-12">
                                    <div className="form-item w-100">
                                        <label className="form-label my-3">Name<sup className='text-danger'>*</sup></label>
                                        <input type="text"
                                        onChange={handleChange}
                                        name='name'
                                        value={name} className="form-control" required={true}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Company Name<sup className='text-danger'>*</sup></label>
                                <input onChange={handleChange} name='companyName' value={companyName} type="text" className="form-control" required={true}/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Address <sup className='text-danger'>*</sup></label>
                                <input onChange={handleChange} name='address' value={address} type="text" className="form-control" required={true} placeholder="House Number Street Name"/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Town/City<sup className='text-danger'>*</sup></label>
                                <input onChange={handleChange} name='city' value={city} type="text" className="form-control" required={true}/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">State<sup className='text-danger'>*</sup></label>
                                <input onChange={handleChange} name='state' value={state} type="text" className="form-control" required={true}/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Country<sup className='text-danger'>*</sup></label>
                                <input onChange={handleChange} name='country' value={country} type="text" className="form-control" required={true}/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Postcode/Zip<sup className='text-danger'>*</sup></label>
                                <input onChange={handleChange} name='zipCode' value={zipCode} type="text" className="form-control" required={true}/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Mobile<sup className='text-danger'>*</sup></label>
                                <input onChange={handleChange} name='contact' value={contact} type="tel" className="form-control" required={true}/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Email Address<sup className='text-danger'>*</sup></label>
                                <input onChange={handleChange} name='email' value={email} type="email" className="form-control" required={true}/>
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
                                    {currentCart.items?.length > 0 ? currentCart.items.map((item,index)=>{
                                      return<tr key={index}>
                                            <th scope="row">
                                                <div className="d-flex align-items-center mt-2">
                                                    <img src={item.product.images[0]} className="img-fluid rounded" style={{width: "90px", height: "90px"}} alt={item.name}/>
                                                </div>
                                            </th>
                                            <td className="py-5 small">{item.product.name}</td>
                                            <td className="py-5">₹{item.product.price}</td>
                                            <td className="py-5">{item.quantity}</td>
                                            <td className="py-5">₹{+item.product.price * item.quantity}</td>
                                        </tr>
                                    }) : <h5>No Items!</h5>}
                                        
                                        <tr>
                                            <th scope="row">
                                            </th>
                                            <td className="py-5"></td>
                                            <td className="py-5"></td>
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
                                            <th scope="row">
                                            </th>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark py-4">Tax</p>
                                            </td>
                                            <td colSpan="3" className="py-5">
                                            <div className="py-3 border-bottom border-top">
                                                    <p className="mb-0 text-dark">₹{currentCart.tax || 0}</p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                            </th>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark text-uppercase py-3">TOTAL</p>
                                            </td>
                                            <td className="py-5"></td>
                                            <td className="py-5"></td>
                                            <td className="py-5">
                                                <div className="py-3 border-bottom border-top">
                                                    <p className="mb-0 text-dark">₹{currentCart.grandTotal || 0}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-12">
                                    <div className="form-check text-start my-3">
                                        <input type="radio" className="form-check-input bg-primary border-0" checked={payment === 'cod' ? true : false} id="cod" onChange={handleChange} name="payment" value="cod"/>
                                        <label className="form-check-label" htmlFor="delivery">Cash On Delivery</label>
                                    </div>
                                    <div className="form-check text-start my-3">
                                        <input type="radio" className="form-check-input bg-primary border-0" checked={payment === 'upi' ? true : false} id="upi" onChange={handleChange} name="payment" value="upi"/>
                                        <label className="form-check-label" htmlFor="delivery">Pay via UPI</label>
                                    </div>
                                </div>
                            </div>
                            <button type={payment === "upi" ? 'button' : 'submit' } onClick={(event) => payment === "upi" ? setShowModal(true) : handleSubmit(event)} className="btn border-secondary py-2 px-2 w-100 text-primary">{payment === 'upi' ? "Proceed to Pay" : "Place Order"}</button>
                            {/* <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-12">
                                    <div className="form-check text-start my-3">
                                        <input type="radio" className="form-check-input bg-primary border-0" checked={payment === 'stripe' ? true : false} id="stripe" onChange={handleChange} name="payment" value="stripe"/>
                                        <label className="form-check-label" htmlFor="payment">Pay with Stripe</label>
                                    </div>
                                    <div className="form-check text-start my-3">
                               
                                    </div>
                                </div>
                            </div> */}
                         {/* <div className="row g-4 text-center align-items-center payment-button justify-content-center pt-4">
                                  {payment === "stripe" ? <Stripe 
                                 stripeKey={process.env.REACT_APP_STRIPE_KEY}
                                   /> : <button type="submit" onClick={submit} className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place Order</button>}
                            </div> */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Pay via UPI</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-style'>
          <img src="/images/paymnet-QR.jpg" alt="UPI QR Code" className="img-fluid img" />
          <Form.Group controlId="formFile" className="mt-3">
            <Form.Label className='fw-semibold'>Upload Screenshot Of Payment</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setScreenshot(e.target.files[0])}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer> 
          <Button variant="primary" onClick={handleUPISubmit}>
            Submit Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Checkout
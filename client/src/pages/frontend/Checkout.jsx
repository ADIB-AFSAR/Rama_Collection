import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormData } from '../../hooks/useFormData'
import { placeOrderStart } from '../../redux/action/order.action'
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
  
 const submit = (event)=>{
    event.preventDefault();
    const orderPlaced = {cartId: currentCart._id, billingAddress : formData}
    console.log(orderPlaced)
    dispatch(placeOrderStart(orderPlaced))
     
    }
  useEffect(()=>{
    console.log(currentCart)
    if(!currentUser.name){
       navigate('/login')
  }
  navigate('/thankyou')
  setFormData((preValue)=>({
    ...preValue,
    name:currentUser.name,
    contact :currentUser.contact,
    email : currentUser.email
   }))
 
  },[currentUser.name , ])

  const handleToken = async (totalAmount, token) => {
    console.log(token);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/stripe-pay`, {
        method: "POST",
        headers: {
          "Authorization": getToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          amount: totalAmount,
        }),
      });
      
      // Check if response is okay before parsing JSON
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      // Parse response
      const result = await response.json();
      console.log(result);
  
      // Only call submit if result is valid
      if (result.success) {
        submit()
        navigate("/thankyou");
    } else {
        console.log("Payment failed:", result.message);
    }
    } catch (err) {
      console.log("Error occurred:", err);
    }
  };
  

  const tokenHandler = (token)=>{

    handleToken(currentCart.grandTotal,token)
  }

  return (
    <>
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-dark display-6">Checkout</h1>
        </div>
        <div className="container-fluid py-5">
            <div className="container py-5">
                <h1 className="mb-4">Billing details</h1>
                <form onSubmit={()=>{submit()}}>
                    <div className="row g-5">
                        <div className="col-md-12 col-lg-6 col-xl-7">
                            <div className="row">
                                <div className="col-md-12 col-lg-12">
                                    <div className="form-item w-100">
                                        <label className="form-label my-3">Name<sup>*</sup></label>
                                        <input type="text"
                                        onChange={handleChange}
                                        name='name'
                                        value={name} className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Company Name<sup>*</sup></label>
                                <input onChange={handleChange} name='companyName' value={companyName} type="text" className="form-control"/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Address <sup>*</sup></label>
                                <input onChange={handleChange} name='address' value={address} type="text" className="form-control" placeholder="House Number Street Name"/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Town/City<sup>*</sup></label>
                                <input onChange={handleChange} name='city' value={city} type="text" className="form-control"/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">State<sup>*</sup></label>
                                <input onChange={handleChange} name='state' value={state} type="text" className="form-control"/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Country<sup>*</sup></label>
                                <input onChange={handleChange} name='country' value={country} type="text" className="form-control"/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Postcode/Zip<sup>*</sup></label>
                                <input onChange={handleChange} name='zipCode' value={zipCode} type="text" className="form-control"/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Mobile<sup>*</sup></label>
                                <input onChange={handleChange} name='contact' value={contact} type="tel" className="form-control"/>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Email Address<sup>*</sup></label>
                                <input onChange={handleChange} name='email' value={email} type="email" className="form-control"/>
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
                                    {currentCart.items?.length > 0 && currentCart.items.map((item,index)=>{
                                      return<tr key={index}>
                                            <th scope="row">
                                                <div className="d-flex align-items-center mt-2">
                                                    <img src={process.env.REACT_APP_API_URL+item.product.images[0]} className="img-fluid rounded" style={{width: "90px", height: "90px"}} alt={item.name}/>
                                                </div>
                                            </th>
                                            <td className="py-5 small">{item.product.name}</td>
                                            <td className="py-5">₹{item.product.price}</td>
                                            <td className="py-5">{item.quantity}</td>
                                            <td className="py-5">₹{+item.product.price * item.quantity}</td>
                                        </tr>
                                    })}
                                        
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
                               
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-12">
                                    <div className="form-check text-start my-3">
                                        <input type="radio" className="form-check-input bg-primary border-0" checked={payment === 'stripe' ? true : false} id="stripe" onChange={handleChange} name="payment" value="stripe"/>
                                        <label className="form-check-label" htmlFor="payment">Pay with Stripe</label>
                                    </div>
                                    <div className="form-check text-start my-3">
                               
                                    </div>
                                </div>
                            </div>
                         <div className="row g-4 text-center align-items-center payment-button justify-content-center pt-4">
                                  {payment === "stripe" ? <Stripe 
                                 stripeKey={process.env.REACT_APP_STRIPE_KEY}
                                  token={tokenHandler}/> : <button type="submit" onClick={submit} className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place Order</button>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Checkout
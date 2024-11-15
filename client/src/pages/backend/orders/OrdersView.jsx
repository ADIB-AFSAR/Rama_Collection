import React, { useEffect, useState } from 'react' 
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Sidebar from '../Sidemenu/Sidemenu'
import '../backend.css'


function OrdersView() {
  const {id} = useParams()
  const [order,setOrder] = useState({})
  const orders = useSelector(state=>state.order.orders)
  const navigate = useNavigate()
  
  const getOrderById = ()=>{
    let order = orders.find(order => order._id === id)

    if(order){
      setOrder(order)
    }else{
      navigate('/admin/order')
    }
  }
  useEffect(()=>{
      if(!id){
        navigate('/admin/order')
      }
      getOrderById()
  },[id])
  return (
 
      <> 
     <div className="container-fluid page-header">
            <h1 className="text-center   display-6">Order View</h1>
             
        </div>    
        <div className='container pt-4'>
           <div className='row'>
           <Sidebar/>
            <div className="card shadow orderview col-9">
            <div className="card-body">
            <div className="card-header d-flex justify-content-between">
              <h4 className="card-title fw-bold">#Order Id - #{order?._id}</h4>
              <Link to="/order" className="btn btn-primary">Back</Link>
            </div>
            </div>
             <div className='card-body'>
                <div>
                  <h5>Order Summary</h5>
                  <hr/>
                  <p>Sub-Total : ₹{order?.subTotal}</p>
                  <hr/>
                  <p>Tax : ₹{order?.tax}</p>
                  <hr/>
                  <p>Grand-Total : ₹{order?.grandTotal}</p>
                  <hr/>
                </div>
             </div>
             <div className='card-body'>
             <div>
                  <h5>Billing Address</h5>
                  <hr/>
                  <p>Name : {order.billingAddress?.name}</p>
                  <hr/>
                  <p>contact : {order.billingAddress?.contact}</p>
                  <hr/>
                  <p>Address : {order.billingAddress?.address}</p>
                  <hr/>
                  <p>City : {order.billingAddress?.city}</p>
                  <hr/>
                  <p>State : {order.billingAddress?.state}</p>
                  <hr/>
                  <p>Pin code : {order.billingAddress?.zipCode}</p>
                  <hr/>
                </div>
                <div className='card-body'>
                <div>
                  <h5>Payment Type </h5>
                  <hr/>
                  <p>{order.billingAddress?.payment === "cod" ? "Cash on delivery" : "Transaction through Stripe"}</p>
                  <hr/>
                  </div>
                  </div>
             </div>
             <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope='col'>Quantity</th> 
                  <th scope='col'>Total</th>
                </tr>
              </thead>
              <tbody>
              {order?.items?.length > 0 && order?.items?.map((item,index) =>{
              return <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td className="py-3 rounded"><img src={item?.product?.images[0]} alt={item?.name} height={'90px'}/></td>
                        <td className="py-3">{item?.product?.name}</td>
                        <td className="py-3">₹{item?.product?.price}</td>
                        <td className="py-3 text-center">{item?.quantity}</td> 
                        <td className="py-3">₹{+item.product.price * item.quantity}</td>
                      </tr>
               })}
              </tbody>
            </table>
          </div>
            </div>
           </div>
         
    
    </>
  )
}

export default OrdersView
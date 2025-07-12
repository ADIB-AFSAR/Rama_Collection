import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { getAllOrdersStart, getOrderStart, getUserOrdersStart } from '../../../redux/action/order.action';
import Sidebar from '../Sidemenu/Sidemenu';
import '../backend.css';
import axios from 'axios';
import { getToken } from '../../../redux/service/token.service';
import { Spinner } from 'react-bootstrap';
import {toast} from "react-toastify"

function Orders() {
    const [orders, setOrders] = useState([]);
    const currentUser  = useSelector(state => state.user.currentUser );
    const orderState = useSelector(state => state.order.orders);
    const loading = useSelector(state => state.order.loading);

    const dispatch = useDispatch();

    console.log(currentUser)

    
    useEffect(() => {
    if (!currentUser) return;
        // Fetch orders when the component mounts
        if(currentUser && currentUser.role == "admin"){
          dispatch(getAllOrdersStart())
        }else{
          dispatch(getUserOrdersStart(currentUser.id))
        }
     }, [currentUser]);

    useEffect(() => {
    if (orderState && orderState.length > 0) {
        setOrders(orderState); // Directly set from Redux, already filtered
    }
}, [orderState]);
    console.log("Orders:",orders)
    
    const handlePayment = async (paymentId) => {
  toast(({ closeToast }) => (
    <div>
      <p>Are you sure you want to approve this order payment?</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
        <button
          onClick={async () => {
            try {
              await axios.post(
                `${process.env.REACT_APP_API_URL}/api/admin/order/secure-payment/${paymentId}`, {},
                {
                  headers: {
                    "Authorization": getToken()
                  }
                }
              );
              toast.success("Payment approved successfully");
            } catch (error) {
              console.error("Error approving payment:", error.message);
              toast.error("Failed to approve payment");
            } finally {
              closeToast();
            }
          }}
          style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px' }}
        >
          Yes
        </button>
        <button
          onClick={closeToast}
          style={{ backgroundColor: 'gray', color: 'white', border: 'none', padding: '5px 10px' }}
        >
          Cancel
        </button>
      </div>
    </div>
  ), {
    autoClose: false,
    closeOnClick: false,
    draggable: false,
    closeButton: false
  });
};
 

    return (
        <> 
            <div className="container-fluid page-header mt-2">
                <h1 className="text-center display-6">Orders</h1>
            </div>    
            <div className='container pt-4'>
                <div className='row'>
                    <Sidebar />
                    <div className="card col-9 order shadow">
                        <div className="card-body">
                            <div className="card-header bg-dark d-flex justify-content-between">
                                <h4 className="card-title text-white fw-bold">Orders</h4>
                            </div>
                           <div className='table-responsive'>{loading ?<p className='spinner-container'><Spinner animation="border" size="sm" className="text-primary spinner mt-2" /></p> : <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Sub total</th>
                                        <th scope="col">Tax</th>
                                        <th scope='col'>Grand Total</th>
                                        <th scope='col'>Payment</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.length > 0 ? orders?.map((order, index) => (
                                        <tr key={order?._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{order?.customer?.name || 'N/A'}</td>
                                            <td>₹{order?.subTotal}</td>
                                            <td>₹{order?.tax}</td>
                                            <td>₹{order?.grandTotal}</td>
                                            <td>
                                                
                                                {order?.paymentId?.status ? <button className={`btn btn-sm complete btn-${order?.paymentId?.status && order?.paymentId?.status === "Pending" ? "warning" : "success"}`}>{order?.paymentId?.type === "cod" && order?.paymentId?.status === "Pending" ? "COD" : order?.paymentId?.status}</button>: "Not Found"}
                                            </td>
                                            <td>
                                                {currentUser.role === 'admin'&& order?.paymentId?.status === "Pending" && order?.paymentId?.type === "upi" && <button onClick={()=>handlePayment(order?.paymentId?._id)}  className='btn mx-1 mt-1 btn-sm btn-info complete'>Approve</button>}<Link to={`/order/view/${order._id}`} className='btn btn-dark btn-sm complete me-2'>View</Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                        <td colSpan="6" className="text-center">No orders found / Slow Internet</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Orders;
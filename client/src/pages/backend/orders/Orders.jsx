import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { getOrderStart } from '../../../redux/action/order.action';
import Sidebar from '../Sidemenu/Sidemenu';
import '../backend.css';

function Orders() {
    const [orders, setOrders] = useState([]);
    const currentUser  = useSelector(state => state.user.currentUser );
    const orderState = useSelector(state => state.order.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch orders when the component mounts
        dispatch(getOrderStart());
    }, [dispatch]);

    useEffect(() => {
        // Filter orders based on user role
        if (currentUser ) {
            if (currentUser.role === 'admin') {
                setOrders(orderState); // Admin sees all orders
            } else {
                const userOrders = orderState.filter(ord => ord.customer?._id === currentUser?.id);
                setOrders(userOrders); // Customer sees only their orders
            }
        }
    }, [orderState, currentUser ]); 

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
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Sub total</th>
                                        <th scope="col">Tax</th>
                                        <th scope='col'>Grand Total</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.length > 0 ? orders?.map((order, index) => (
                                        <tr key={order?._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{order?.customer?.name || 'N/A'}</td>
                                            <td>{order?.subTotal}</td>
                                            <td>{order?.tax}</td>
                                            <td>{order?.grandTotal}</td>
                                            <td>
                                                <Link to={`/order/view/${order._id}`} className='btn btn-info me-2'>View</Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">No orders found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Orders;
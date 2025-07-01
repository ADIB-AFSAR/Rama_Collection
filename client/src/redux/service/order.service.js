import { getToken } from "./token.service"; 
import { toast } from "react-toastify";

export const getOrderFromAPI = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/order`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': getToken(),
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching orders: ${response.statusText}`);
        }

        const data = await response.json();
        return data.order || []; // Return an empty array if no order is found
    } catch (error) {
        console.error(error);
        return []; // Return an empty array or handle error accordingly
    }
};

export const placeOrderToAPI = async (payload) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/place-order/${payload.cartId}`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                'Authorization': getToken(),
            },
        });

        if (!response.ok) {
            throw new Error(`Error placing order: ${response.statusText}`);
        }
    
        const res = await response.json();
        console.log(res, "Order Added");
        toast.success(res.message)
        return res;
    } catch (error) {
        console.error(error);
        toast.error(error.message)
    }
};

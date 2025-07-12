import { GET_ORDER_ERROR, GET_ORDER_START, GET_ORDER_SUCCESS, PLACE_ORDER_ERROR, PLACE_ORDER_SUCCESS } from "../constant/order.constant";

// Load initial orders from local storage if available
const initialState = {
    orders: JSON.parse(localStorage.getItem('orders')) || [],
    error: null, // Initialize error state
    device : null,
    loading : false,
    orderDetails: null,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_START :
            return { ...state, loading: true, error: null };
        case GET_ORDER_SUCCESS:
            // Update the orders state and also store it in localStorage
            localStorage.setItem('orders', JSON.stringify(action.payload)); // Uncomment if you want to persist orders
            return {
                ...state,
                orders: [...action.payload], // Replace current orders with new ones
                error: null, // Clear any existing errors
                device :  action.payload.device
            };
        case GET_ORDER_ERROR:
            return {
                ...state,
                error: action.payload, // Capture error details
            };
            case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        orderDetails: action.payload.order,
        device: action.payload.device,
        loading: false,
        error: null,
      };

    case PLACE_ORDER_ERROR:
      return { ...state, loading: false, error: action.payload };
        default:
            return state; // Return the current state for unrecognized actions
    }
};

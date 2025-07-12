import { combineReducers } from "@reduxjs/toolkit";
import { categoryReducer } from "./category.reducer";
import { productReducer } from "./product.reducer";
import { userReducer } from "./user.reducer";
import { cartReducer } from "./cart.reducer";
import { orderReducer } from "./order.reducer";
import wishlistReducer from "./wishlist.reducer";
import reviewReducer from "./review.reducer";

// Combine all individual reducers into a single root reducer
export const rootReducer = combineReducers({
    category: categoryReducer, // Handles categories
    product: productReducer, // Handles products
    user: userReducer, // Manages user state
    cart: cartReducer, // Manages cart state
    order: orderReducer, // Manages order state
    wishlist : wishlistReducer, //manage wishlist items
    review: reviewReducer //Manage review data
});

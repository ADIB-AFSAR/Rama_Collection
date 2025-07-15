import { all, fork } from "redux-saga/effects";
import category from "./category.saga";
import product from "./product.saga";
import user from "./user.saga";
import cart from "./cart.saga";
import order from "./order.saga";
import { watchWishlist } from "./wishlist.saga";
import reviewSaga from "./review.saga";
import authSaga from "./googleAuth.saga";

export default function* root(){
    yield all([
        fork(product),
        fork(category),
        fork(user),
        fork(cart),
        fork(order),
        fork(watchWishlist),
        fork(reviewSaga),
        fork(authSaga)
    ])
}
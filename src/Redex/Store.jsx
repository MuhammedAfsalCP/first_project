import { configureStore } from "@reduxjs/toolkit"
import productReducer from './ProductSlice';
import UserSlice from './UserSlice'
import CartSlice from './CartSlice'
import PaymentSlice from './PaymentSlice'
import OrderSlice from './OrderSlice'
import DashBoardSlice from './DashBoardSlice'
const store = configureStore({
    reducer: {

        Products: productReducer,
        User:UserSlice,
        Cart:CartSlice,
        Payment:PaymentSlice,
        Order:OrderSlice,
        DashBoard:DashBoardSlice
    }
})

export default store
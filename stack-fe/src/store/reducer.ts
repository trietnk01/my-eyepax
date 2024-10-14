// third-party
import { combineReducers } from "redux";
import loadingSlice from "./slices/loadingSlice";
import accountSlice from "./slices/accountSlice";
import cartSlice from "./slices/cartSlice";
// project imports

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({ loading: loadingSlice, account: accountSlice, cart: cartSlice });

export default reducer;

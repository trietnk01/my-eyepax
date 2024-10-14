import { IconBaseProps } from "@ant-design/icons/lib/components/Icon";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ldash from "lodash";
import ICart from "@/types/cart";
interface IProps {
  cartData: ICart[];
}
const initialState: IProps = {
  cartData: []
};
const slice = createSlice({
  name: "cart-slice",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<ICart>) => {
      state.cartData.push(action.payload);
    },
    updateCart: (state, action: PayloadAction<ICart>) => {
      let darftCart: ICart[] = ldash.cloneDeep(state.cartData);
      darftCart.forEach((elmt) => {
        if (elmt.id === action.payload.id) elmt.quantity = action.payload.quantity;
      });
      state.cartData = darftCart;
    },
    removeCart: (state, action: PayloadAction<ICart>) => {
      state.cartData = state.cartData.filter((elmt) => {
        return elmt.id !== action.payload.id;
      });
    }
  }
});
export default slice.reducer;
export const { addCart, updateCart, removeCart } = slice.actions;

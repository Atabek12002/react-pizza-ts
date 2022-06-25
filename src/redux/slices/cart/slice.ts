import { calcTotalPrice } from './../../../utils/calcTotalPrice';
import { getCartFromLs } from './../../../utils/getCartFromLS';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartSliceState } from './types';

const initialState: CartSliceState = getCartFromLs();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, { payload }: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...payload, count: 1 });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    plusItem(state, { payload }: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === payload);
      if (findItem) {
        findItem.count++;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, { payload }: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, { payload }: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions;
export default cartSlice.reducer;

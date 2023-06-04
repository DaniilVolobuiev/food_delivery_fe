import { createSlice } from '@reduxjs/toolkit';
import { calcTotalPrice } from 'utils/getCalcTotalPrice';

export interface ICartItem {
  id: number;
  title: string;
  imgUrl: string;
  price: number;
  count: number;
  shop: { id: number; lat: number; lng: number };
}

const initialState = {
  cart: [] as ICartItem[],
  totalPrice: 0 as number,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action) {
      const newItem = {
        ...action.payload,
        count: 1,
      };
      const existingItemIndex = state.cart.findIndex((item) => item.id === newItem.id);
      const existingShopIndex = state.cart.findIndex((item) => item.shop.id === newItem.shop.id);
      if (existingItemIndex !== -1 && existingShopIndex !== -1) {
        state.cart[existingItemIndex].count += 1;
      } else if (existingShopIndex !== -1 || state.cart.length === 0) {
        state.cart.push(newItem);
      }
      state.totalPrice = calcTotalPrice(state.cart);
    },
    plusItem(state, action) {
      const itemId = action.payload.id;
      const item = state.cart.find((item) => item.id === itemId);
      if (item) {
        item.count += 1;
      }
      state.totalPrice = calcTotalPrice(state.cart);
    },
    minusItem(state, action) {
      const itemId = action.payload.id;
      const item = state.cart.find((item) => item.id === itemId);
      if (item && item.count > 1) {
        item.count -= 1;
      }
      state.totalPrice = calcTotalPrice(state.cart);
    },
    removeItem(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      state.totalPrice = calcTotalPrice(state.cart);
    },
  },
});

export const { reducer: cartReducer, actions: cartActions } = cartSlice;

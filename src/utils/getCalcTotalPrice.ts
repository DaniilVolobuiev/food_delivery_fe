import { ICartItem } from '@redux/slices/cartSlice';

export const calcTotalPrice = (cartItems: ICartItem[]) => {
  return cartItems.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

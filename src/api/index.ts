import axios from './axios';

const api = {
  getItems: async (shopId: number) => await axios.get(`/product/${shopId}/items`),
  getShops: async () => await axios.get(`/product/shops`),
  postOrder: async (order: any) => await axios.post(`/product/order`, { ...order }),
};

export default api;

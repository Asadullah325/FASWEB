export type CheckoutSessionRequest = {
  cartItems: {
    menuId: string;
    name: string;
    image: string;
    price: string;
    quantity: string;
  }[];
  delivaryDetails: {
    name: string;
    email: string;
    contact: string | number;
    address: string;
    city: string;
    country: string;
  };
  resturantId: string;
};
export interface Orders extends CheckoutSessionRequest {
  _id: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
export type OrderState = {
  loading: boolean;
  orders: Orders[];
  createCheckoutSession: (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => Promise<void>;
  getOrderDetails: () => Promise<void>;
};

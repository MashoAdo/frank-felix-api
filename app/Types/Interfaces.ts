export interface TaskInterface<T extends any[] = any[], R = void> {
  run: (...args: T) => R;
}

export interface ISignIn {
  phone_number: number;
  password: string;
}

export interface ISignUp {
  phone_number: number;
  first_name: string;
  last_name: string;
  password: string;
}

export interface IProductOffer {
  product_id: number;
  sale_price: number;
  available_qty: number;
  color_id: number;
  image: any; //FILE type
}

export interface IUpdateProductOffer extends Partial<IProductOffer> {
  product_offer_id: number;
}

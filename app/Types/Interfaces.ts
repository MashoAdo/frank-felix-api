export interface TaskInterface<T extends any[] = any[], R = void> {
  run: (...args: T) => R;
}

export interface ISignInPayload {
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

export interface IInventoryTrail {
  product_offer_id: number;
  qty: number;
  notes: string;
  stock_movement: TStockMovement;
}

export interface IInventoryTrailQueryParams {
  page: number;
  start_date: string;
  end_date: string;
  min_qty: number;
  max_qty: number;
  stock_movement: TStockMovement;
  product_offer_id: number;
  product_name: string;
}

export interface IUpdateInventoryTrail extends Partial<IInventoryTrail> {
  inventory_id: number;
  product_offer_id: number;
}

export type TStockMovement = "In" | "Out";

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: number;
  created_at?: Date;
  updated_at?: Date;
}

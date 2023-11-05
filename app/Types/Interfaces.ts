import { TStockMovement, TTrailDirection, TTrailType } from "./enums";

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

export interface IUpdateInventoryTrail {
  inventory_trail_id: number;
  product_offer_id: number;
  updated_qty: number;
  updated_stock_movement: TStockMovement;
  updated_notes: string;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IFinancialTrail {
  amount: number;
  usd_rate?: number;
  trail_type: "Cash" | "Bank" | "Mpesa";
  trail_direction: "In" | "Out";
}

export interface IFinancialTrailQueryParams {
  start_date: string;
  end_date: string;
  min_amount: number;
  max_amount: number;
  trail_type: TTrailType;
  trail_direction: TTrailDirection;
  page: number;
}

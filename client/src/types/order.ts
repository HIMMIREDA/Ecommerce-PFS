import { OrderItem } from "./OrderItem";
import { Address } from "./address";

export interface Order {
    id: string;
    total: number;
    createdAt: string;
    status: OrderStatus;
    address: Address;
    orderItems: OrderItem[];
}

export enum OrderStatus {
  PAID = "PAID",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
  PENDING = "PENDING",
}

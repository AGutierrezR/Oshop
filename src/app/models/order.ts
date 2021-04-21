import { OrderItem } from '@models/order-item';
import { Shipping } from '@models/shipping';

export interface Order {
  userId: string;
  datePlaced: number;
  shipping: Shipping;
  items: OrderItem[];
}

import { Product } from '@core/models/product';

export interface OrderItem {
  product: Omit<Product, 'category'>;
  quantity: number;
  totalPrice: number;
}

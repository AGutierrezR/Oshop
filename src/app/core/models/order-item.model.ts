import { Product } from '@core/models/product.model';

export interface OrderItem {
  product: Omit<Product, 'category'>;
  quantity: number;
  totalPrice: number;
}

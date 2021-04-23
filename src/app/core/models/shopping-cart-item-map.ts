import { ShoppingCartItem } from '@core/models/shopping-cart-item';

export interface ShoppingCartItemMap {
  items: { [productId: string]: ShoppingCartItem };
}

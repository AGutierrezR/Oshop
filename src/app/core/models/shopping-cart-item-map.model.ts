import { ShoppingCartItem } from '@core/models/shopping-cart-item.model';

export interface ShoppingCartItemMap {
  items: { [productId: string]: ShoppingCartItem };
}

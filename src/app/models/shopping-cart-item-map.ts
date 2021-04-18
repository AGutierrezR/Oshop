import { ShoppingCartItem } from '@models/shopping-cart-item';

export interface ShoppingCartItemMap {
  items: { [productId: string]: ShoppingCartItem };
}

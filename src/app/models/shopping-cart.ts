import { Product } from '@models/product';
import { ShoppingCartItem } from '@models/shopping-cart-item';
import { ShoppingCartItemMap } from '@models/shopping-cart-item-map';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  get totalItemsCount(): number {
    return this.items.reduce((acc, item) => item.quantity + acc, 0);
  }

  get totalPrice(): number {
    return this.items.reduce((acc, item) => item.totalPrice + acc, 0);
  }

  constructor(private itemsMap: Partial<ShoppingCartItemMap>) {
    for (const productId in itemsMap) {
      if (this.itemsMap[productId]) {
        const item = this.itemsMap[productId];

        this.items.push(new ShoppingCartItem({ ...item, $key: productId }));
      }
    }
  }

  getQuantity(product: Product): number {
    const item = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }
}

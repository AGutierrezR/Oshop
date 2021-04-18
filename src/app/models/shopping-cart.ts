import { ShoppingCartItem } from '@models/shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  get totalItemsCount(): number {
    return this.items.reduce((acc, item) => item.quantity + acc, 0);
  }

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    for (const productId in itemsMap) {
      if (this.itemsMap[productId]) {
        this.items.push(this.itemsMap[productId]);
      }
    }
  }
}

import { ShoppingCartItem } from '@models/shopping-cart-item';

export class ShoppingCart {
  get totalItemsCount(): number {
    let qts = 0;
    for (const productId in this.items) {
      if (this.items[productId]) {
        qts += this.items[productId].quantity;
      }
    }
    return qts;
  }

  get productIds(): string[] {
    return Object.keys(this.items);
  }

  constructor(public items: ShoppingCartItem[]) {}
}

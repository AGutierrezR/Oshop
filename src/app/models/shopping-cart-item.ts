import { Product } from '@models/product';

export class ShoppingCartItem {
  get totalPrice(): number {
    return this.product.price * this.quantity;
  }

  constructor(public product: Product, public quantity: number) {}
}

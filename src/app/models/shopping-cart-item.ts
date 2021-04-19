export class ShoppingCartItem {
  $key: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;

  get totalPrice(): number {
    return this.price * this.quantity;
  }
}

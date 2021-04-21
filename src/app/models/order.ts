import { OrderItem } from '@models/order-item';
import { Shipping } from '@models/shipping';
import { ShoppingCart } from '@models/shopping-cart';

export class Order {
  datePlaced: number;
  items: OrderItem[];

  constructor(
    public userId: string,
    public shipping: Shipping,
    shoppingCart: ShoppingCart
  ) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.items.map((i) => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price,
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice,
      };
    });
  }
}

import { OrderItem } from '@core/models/order-item';
import { Shipping } from '@core/models/shipping';
import { ShoppingCart } from '@core/models/shopping-cart';

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

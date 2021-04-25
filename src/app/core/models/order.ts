import { OrderItem } from '@core/models/order-item';
import { Shipping } from '@core/models/shipping';
import { ShoppingCart } from '@core/models/shopping-cart';

export class Order {
  $key: string;
  datePlaced: number;
  items: OrderItem[];
  totalPrice: number;

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

    this.totalPrice = shoppingCart.totalPrice;
  }
}

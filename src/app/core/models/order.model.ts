import { OrderItem } from '@core/models/order-item.model';
import { Shipping } from '@core/models/shipping.model';
import { ShoppingCart } from '@core/models/shopping-cart.model';

export class Order {
  $key: string;
  datePlaced: number;
  items: OrderItem[];
  totalPrice: number;

  get totalItemsCount(): number {
    return this.items.reduce((acc, item) => item.quantity + acc, 0);
  }

  constructor(
    public userId: string,
    public shipping: Shipping,
    items: ShoppingCart | OrderItem[]
  ) {
    this.datePlaced = new Date().getTime();

    if ('items' in items) {
      this.items = items.items.map((i) => {
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
      this.totalPrice = items.totalPrice;
    } else {
      this.items = items;
    }
  }
}

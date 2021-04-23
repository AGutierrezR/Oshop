import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Order } from '@models/order';
import { toObjectWithKey } from '@shared/utils/toObjectWithKey';
import { map } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  getOrders(): any {
    return this.db.list('/orders').snapshotChanges().pipe(map(toObjectWithKey));
  }

  getOrdersByUser(userId: string): any {
    return this.db
      .list('/orders', (ref) => {
        return ref.orderByChild('userId').equalTo(userId);
      })
      .snapshotChanges()
      .pipe(map(toObjectWithKey));
  }

  async placeOrder(order: Order): Promise<any> {
    const result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
}

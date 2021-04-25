import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Order } from '@core/models/order';
import { ShoppingCartService } from '@core/services/shopping-cart.service';
import { toObjectWithKey } from '@core/utils/toObjectWithKey';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  getOrders(): Observable<Order[]> {
    return this.db.list('/orders').snapshotChanges().pipe(map(toObjectWithKey));
  }

  getOrdersByUser(userId: string): Observable<Order[]> {
    return this.db
      .list('/orders', (ref) => {
        return ref.orderByChild('userId').equalTo(userId);
      })
      .snapshotChanges()
      .pipe(map(toObjectWithKey));
  }

  getOrderById(orderId): Observable<Order> {
    return this.db.object<Order>('/orders/' + orderId).valueChanges();
  }

  placeOrder(order: Order): any {
    const result = this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
}

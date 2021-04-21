import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Order } from '@models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private db: AngularFireDatabase) {}

  storeOrder(order: Order): any {
    return this.db.list('/orders').push(order);
  }
}

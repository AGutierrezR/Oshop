import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Order } from '@core/models/order';
import { OrderService } from '@core/services/order.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class OrdersResolver implements Resolve<Order[]> {
  constructor(private orderService: OrderService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Order[]> {
    return this.orderService.getOrders().pipe(first());
  }
}

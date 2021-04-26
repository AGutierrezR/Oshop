import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Order } from '@core/models/order';
import { AuthService } from '@core/services/auth.service';
import { OrderService } from '@core/services/order.service';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

@Injectable()
export class OrdersResolver implements Resolve<Order[]> {
  constructor(private auth: AuthService, private orderService: OrderService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Order[]> {
    return this.auth.user$.pipe(
      switchMap((u) => this.orderService.getOrdersByUser(u.uid)),
      first()
    );
  }
}

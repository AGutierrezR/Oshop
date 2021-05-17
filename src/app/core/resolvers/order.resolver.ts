import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Order } from '@core/models/order.model';
import { OrderService } from '@core/services/order.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderResolver implements Resolve<Order> {
  constructor(private orderService: OrderService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Order> {
    const id = route.paramMap.get('id');
    return this.orderService.getOrderById(id).pipe(first());
  }
}

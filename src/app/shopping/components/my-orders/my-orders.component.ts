import { Component } from '@angular/core';
import { Order } from '@core/models/order';
import { AuthService } from '@core/services/auth.service';
import { OrderService } from '@core/services/order.service';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
})
export class MyOrdersComponent {
  orders$: Observable<Order[]> = this.auth.user$.pipe(
    switchMap((u) => this.orderService.getOrdersByUser(u.uid))
  );

  constructor(private auth: AuthService, private orderService: OrderService) {}
}

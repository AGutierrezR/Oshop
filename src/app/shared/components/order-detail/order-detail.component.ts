import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@core/models/order';
import { OrderService } from '@core/services/order.service';
import { Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent {
  orderId$: Observable<string> = this.route.params.pipe(map((p) => p.id));
  order$: Observable<Order> = this.orderId$.pipe(
    exhaustMap((id) => this.orderService.getOrderById(id))
  );

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}
}

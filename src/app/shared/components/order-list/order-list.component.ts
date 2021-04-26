import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@core/models/order';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
})
export class OrderListComponent {
  orders: Order[] = this.route.snapshot.data['orders'] || [];

  constructor(private route: ActivatedRoute) {}
}

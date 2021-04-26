import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@core/models/order';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent {
  orderId: string = this.route.snapshot.params['id'];
  order: Order = this.route.snapshot.data['order'];

  constructor(private route: ActivatedRoute) {}
}

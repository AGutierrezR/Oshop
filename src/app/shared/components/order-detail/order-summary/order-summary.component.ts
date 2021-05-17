import { Component, Input } from '@angular/core';
import { Order } from '@core/models/order.model';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent {
  @Input() order: Order;
}

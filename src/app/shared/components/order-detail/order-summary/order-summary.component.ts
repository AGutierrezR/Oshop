import { Component, Input } from '@angular/core';
import { Order } from '@core/models/order';

@Component({
  selector: 'order-sumary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent {
  @Input() order: Order;
}

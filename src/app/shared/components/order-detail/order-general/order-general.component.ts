import { Component, Input } from '@angular/core';
import { Order } from '@core/models/order.model';

@Component({
  selector: 'order-general',
  templateUrl: './order-general.component.html',
  styleUrls: ['./order-general.component.scss'],
})
export class OrderGeneralComponent {
  @Input() order: Order;
}

import { Component, OnInit } from '@angular/core';
import { OrderService } from '@core/services/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
})
export class AdminOrdersComponent implements OnInit {
  orders$: Observable<any> = this.orderService.getOrders();

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}
}

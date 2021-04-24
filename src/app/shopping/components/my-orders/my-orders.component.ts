import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { OrderService } from '@core/services/order.service';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
})
export class MyOrdersComponent implements OnInit {
  orders$: Observable<any> = this.auth.user$.pipe(
    switchMap((u) => this.orderService.getOrdersByUser(u.uid))
  );

  constructor(private auth: AuthService, private orderService: OrderService) {}

  ngOnInit(): void {}
}

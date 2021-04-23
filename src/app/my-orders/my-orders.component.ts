import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { OrderService } from 'src/app/order.service';

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

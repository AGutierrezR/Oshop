import { Component, Input, OnInit } from '@angular/core';
import { Order } from '@core/models/order';

@Component({
  selector: 'order-general',
  templateUrl: './order-general.component.html',
  styleUrls: ['./order-general.component.scss'],
})
export class OrderGeneralComponent implements OnInit {
  @Input() order: Order;

  constructor() {}

  ngOnInit(): void {}
}

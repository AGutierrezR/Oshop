import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
})
export class OrderSuccessComponent implements OnInit {
  orderId;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
  }
}

import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '@models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.shoppingCartService.getCart();
  }
}

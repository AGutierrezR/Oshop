import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '@core/models/shopping-cart';
import { ShoppingCartService } from '@core/services/shopping-cart.service';
import { ProductQuantityMode } from '@shared/components/product-quantity/product-quantity.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  productQuantityMode = ProductQuantityMode.JustQuantity;

  constructor(public shoppingCartService: ShoppingCartService) {}

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.shoppingCartService.getCart();
  }
}

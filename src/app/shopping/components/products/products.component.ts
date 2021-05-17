import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@core/models/product.model';
import { ShoppingCart } from '@core/models/shopping-cart.model';
import { ProductService } from '@core/services/product.service';
import { ShoppingCartService } from '@core/services/shopping-cart.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  filterCriteria$: Observable<string>;
  products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    public shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.cart$ = this.shoppingCartService.getCart();
    this.getFilterCriteria();
    this.populateProducts();
  }

  private getFilterCriteria(): void {
    this.filterCriteria$ = this.route.queryParamMap.pipe(
      map((params) => params.get('category'))
    );
  }

  private populateProducts(): void {
    this.products$ = combineLatest([
      this.productService.getAll(),
      this.filterCriteria$,
    ]).pipe(
      map(([products, category]) =>
        category ? products.filter((p) => p.category === category) : products
      )
    );
  }
}

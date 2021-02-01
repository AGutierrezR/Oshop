import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  cart$;
  filterCriteria$ = this.route.queryParamMap.pipe(
    map((params) => params.get('category'))
  );
  products$ = combineLatest([
    this.productService.getAll(),
    this.filterCriteria$,
  ]).pipe(
    map(([products, category]) =>
      category
        ? products.filter((product) => product.category === category)
        : products
    )
  );

  constructor(
    private productService: ProductService,
    public shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cart$ = this.shoppingCartService.getCart();
  }
}

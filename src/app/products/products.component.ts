import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@models/product';
import { ShoppingCart } from '@models/shopping-cart';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

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
    this.cart$ = await this.shoppingCartService.getCart();
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

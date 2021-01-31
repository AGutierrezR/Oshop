import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  categories$ = this.categoryService.getAll();
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
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}

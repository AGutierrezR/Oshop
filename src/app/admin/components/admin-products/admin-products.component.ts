import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from '@core/models/product.model';
import { CategoryService } from '@core/services/category.service';
import { ProductService } from '@core/services/product.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
})
export class AdminProductsComponent {
  filter: FormControl = new FormControl('');
  filterValue$: Observable<string> = this.filter.valueChanges.pipe(
    startWith('')
  );
  pagination$ = new BehaviorSubject(null);
  page = 1;
  pageSize = 5;

  productsWithCategory$: Observable<Product[]> = combineLatest([
    this.productService.getAll(),
    this.categoryService.getAll(),
  ]).pipe(
    map(([products, categories]) => {
      const memo = {};
      for (const category of categories) {
        memo[category.$key] = category.name;
      }
      return products.map((p) => {
        return { ...p, category: memo[p.category] };
      });
    })
  );
  filteredProducts$: Observable<Product[]> = combineLatest([
    this.productsWithCategory$,
    this.filterValue$,
  ]).pipe(
    map(([products, query]) =>
      products.filter(
        (product) =>
          product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          product.category.toLowerCase().indexOf(query.toLowerCase()) !== -1
      )
    )
  );

  productsPerPage$: Observable<Product[]> = combineLatest([
    this.filteredProducts$,
    this.pagination$,
  ]).pipe(
    map(([products]) =>
      products.slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      )
    )
  );

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  delete(id: string): void {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    this.productService.delete(id);
  }
}

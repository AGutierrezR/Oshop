import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  products$ = this.productService.getAll();
  filter: FormControl = new FormControl('');
  filter$: Observable<string> = this.filter.valueChanges.pipe(startWith(''));
  pagination$ = new BehaviorSubject(null);
  filteredProducts$ = combineLatest([this.products$, this.filter$]).pipe(
    map(([products, query]) =>
      products.filter(
        (product) =>
          product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
      )
    )
  );
  productsPerPage$ = combineLatest([
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

  page = 1;
  pageSize = 5;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  delete(id: string): void {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    this.productService.delete(id);
  }
}

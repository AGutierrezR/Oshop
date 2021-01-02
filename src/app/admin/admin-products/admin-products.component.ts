import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, map, startWith, tap } from 'rxjs/operators';
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
  filteredProducts$ = combineLatest([this.products$, this.filter$]).pipe(
    map(([products, query]) =>
      products.filter(
        (product) =>
          product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
      )
    )
  );

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  delete(id: string): void {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    this.productService.delete(id);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@core/models/product';
import { CategoryService } from '@core/services/category.service';
import { ProductService } from '@core/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  @ViewChild(NgForm) productForm: NgForm;
  categories$ = this.categoryService.getAll();
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id);
    }
  }

  save(product: Product): void {
    if (this.productForm.invalid) {
      return;
    }

    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  cancel(): void {
    this.router.navigate(['/admin/products']);
    this.productService.setInitialState();
  }

  delete(): void {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    this.productService.setInitialState();
  }
}

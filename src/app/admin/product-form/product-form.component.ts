import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @ViewChild(NgForm) productForm: NgForm;
  categories$ = this.categoryService.getCategories();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.get(id);
    }
  }

  save(product): void {
    if (this.productForm.invalid) {
      return;
    }
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  cancel(): void {
    this.router.navigate(['/admin/products']);
    this.productService.setInitialState();
  }
}

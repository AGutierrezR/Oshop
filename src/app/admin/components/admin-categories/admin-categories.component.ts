import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  CategoryService,
  ProductCategory,
} from '@core/services/category.service';
import { ProductService } from '@core/services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'admin-categories',
  templateUrl: './admin-categories.component.html',
})
export class AdminCategoriesComponent {
  @ViewChild('content', { static: false }) modal;
  categoryName: FormControl = new FormControl('');
  modalTitle: string;

  categories$: Observable<ProductCategory[]> = combineLatest([
    this.categoryService.getAll(),
    this.productService.getAll(),
  ]).pipe(
    map(([categories, products]) => {
      const memo = {};

      for (const product of products) {
        if (memo[product.category]) {
          memo[product.category]++;
        } else {
          memo[product.category] = 1;
        }
      }

      return categories.map((c) => {
        return { ...c, count: memo[c.$key] };
      });
    })
  );

  constructor(
    private modalService: NgbModal,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  openCreate(): void {
    this.modalTitle = 'Create Category';
    this.modalService.open(this.modal, { centered: true }).result.then(
      (name) => {
        this.save({ name });
      },
      () => {
        this.setInputValue();
      }
    );
  }

  openEdit(category): void {
    this.modalTitle = 'Edit Category';
    this.setInputValue(category.name);

    this.modalService.open(this.modal, { centered: true }).result.then(
      (name) => {
        this.save({ name }, category.$key);
      },
      () => {
        this.setInputValue();
      }
    );
  }

  save(category: ProductCategory, id?): void {
    if (id) {
      this.categoryService.update(id, category);
    } else {
      this.categoryService.create(category);
    }

    this.setInputValue();
  }

  delete(id: string): void {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }
    this.categoryService.delete(id);
  }

  private setInputValue(value: string = ''): void {
    this.categoryName.setValue(value, { emitEvent: false });
  }
}

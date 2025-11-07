// src/app/components/categories/category-list/category-list.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { Category } from '../../../core/models/category.model';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, CategoryFormComponent],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];
  @Output() categorySelected = new EventEmitter<number | null>();
  @Output() categoriesChanged = new EventEmitter<void>();

  selectedCategoryId: number | null = null;
  showCategoryForm: boolean = false;
  editingCategory: Category | null = null;

  constructor(private categoryService: CategoryService) {}

  selectCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.categorySelected.emit(categoryId);
  }

  openCategoryForm(): void {
    this.editingCategory = null;
    this.showCategoryForm = true;
  }

  onEditCategory(category: Category, event: Event): void {
    event.stopPropagation();
    this.editingCategory = category;
    this.showCategoryForm = true;
  }

  onDeleteCategory(categoryId: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this category? All tasks in this category will remain but lose their category assignment.')) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          if (this.selectedCategoryId === categoryId) {
            this.selectCategory(null);
          }
          this.categoriesChanged.emit();
        },
        error: (error) => {
          console.error('Error deleting category:', error);
          alert('Failed to delete category. It may have associated tasks.');
        }
      });
    }
  }

  onCategoryFormClose(): void {
    this.showCategoryForm = false;
    this.editingCategory = null;
  }

  onCategorySaved(): void {
    this.showCategoryForm = false;
    this.editingCategory = null;
    this.categoriesChanged.emit();
  }
}

// src/app/components/categories/category-form/category-form.component.ts

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from '../../../core/models/category.model';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @Input() category: Category | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  categoryName: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    if (this.category) {
      this.categoryName = this.category.name;
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    if (this.category) {
      const updateRequest: UpdateCategoryRequest = {
        id: this.category.id,
        name: this.categoryName
      };

      this.categoryService.updateCategory(updateRequest).subscribe({
        next: () => {
          this.saved.emit();
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to update category';
          this.isLoading = false;
        }
      });
    } else {
      const createRequest: CreateCategoryRequest = {
        name: this.categoryName
      };

      this.categoryService.createCategory(createRequest).subscribe({
        next: () => {
          this.saved.emit();
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to create category';
          this.isLoading = false;
        }
      });
    }
  }

  onClose(): void {
    this.close.emit();
  }
}

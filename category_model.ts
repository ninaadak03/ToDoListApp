// src/app/core/models/category.model.ts

export interface Category {
  id: number;
  name: string;
  userId: number;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  id: number;
  name: string;
}

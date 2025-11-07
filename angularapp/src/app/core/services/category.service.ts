import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private categories: Category[] = [];

  list(): Category[] { return this.categories; }
  add(category: Category) { this.categories.push(category); }
  update(updated: Category) { this.categories = this.categories.map(c => c.id === updated.id ? updated : c); }
  remove(id: string) { this.categories = this.categories.filter(c => c.id !== id); }
}

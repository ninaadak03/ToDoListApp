// src/app/core/services/category.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from '../models/category.model';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  public categories$ = this.categoriesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAllCategories(): Observable<Category[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Category[]>(this.apiUrl, { headers })
      .pipe(
        tap(categories => this.categoriesSubject.next(categories))
      );
  }

  getCategoryById(id: number): Observable<Category> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Category>(`${this.apiUrl}/${id}`, { headers });
  }

  createCategory(request: CreateCategoryRequest): Observable<Category> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Category>(this.apiUrl, request, { headers })
      .pipe(
        tap(() => this.getAllCategories().subscribe())
      );
  }

  updateCategory(request: UpdateCategoryRequest): Observable<Category> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put<Category>(`${this.apiUrl}/${request.id}`, request, { headers })
      .pipe(
        tap(() => this.getAllCategories().subscribe())
      );
  }

  deleteCategory(id: number): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers })
      .pipe(
        tap(() => this.getAllCategories().subscribe())
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../models/task.model';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAllTasks(): Observable<Task[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Task[]>(this.apiUrl, { headers })
      .pipe(
        tap(tasks => this.tasksSubject.next(tasks))
      );
  }

  getTaskById(id: number): Observable<Task> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Task>(`${this.apiUrl}/${id}`, { headers });
  }

  getTasksByCategory(categoryId: number): Observable<Task[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Task[]>(`${this.apiUrl}/category/${categoryId}`, { headers })
      .pipe(
        tap(tasks => this.tasksSubject.next(tasks))
      );
  }

  createTask(request: CreateTaskRequest): Observable<Task> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Task>(this.apiUrl, request, { headers })
      .pipe(
        tap(() => this.getAllTasks().subscribe())
      );
  }

  updateTask(request: UpdateTaskRequest): Observable<Task> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put<Task>(`${this.apiUrl}/${request.id}`, request, { headers })
      .pipe(
        tap(() => this.getAllTasks().subscribe())
      );
  }

  toggleTaskComplete(id: number): Observable<Task> {
    const headers = this.authService.getAuthHeaders();
    return this.http.patch<Task>(`${this.apiUrl}/${id}/toggle`, {}, { headers })
      .pipe(
        tap(() => this.getAllTasks().subscribe())
      );
  }

  deleteTask(id: number): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers })
      .pipe(
        tap(() => this.getAllTasks().subscribe())
      );
  }
}

import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [];

  list(): Task[] { return this.tasks; }
  add(task: Task) { this.tasks.push(task); }
  update(updated: Task) { this.tasks = this.tasks.map(t => t.id === updated.id ? updated : t); }
  remove(id: string) { this.tasks = this.tasks.filter(t => t.id !== id); }
}

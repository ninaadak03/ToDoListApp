// src/app/components/tasks/task-list/task-list.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../../../core/models/task.model';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() categories: Category[] = [];
  @Input() isLoading: boolean = false;
  @Output() tasksChanged = new EventEmitter<void>();

  showTaskForm: boolean = false;
  editingTask: Task | null = null;

  get completedTasks(): Task[] {
    return this.tasks.filter(task => task.isCompleted);
  }

  get pendingTasks(): Task[] {
    return this.tasks.filter(task => !task.isCompleted);
  }

  openTaskForm(): void {
    this.editingTask = null;
    this.showTaskForm = true;
  }

  onEditTask(task: Task): void {
    this.editingTask = task;
    this.showTaskForm = true;
  }

  onTaskFormClose(): void {
    this.showTaskForm = false;
    this.editingTask = null;
  }

  onTaskSaved(): void {
    this.showTaskForm = false;
    this.editingTask = null;
    this.tasksChanged.emit();
  }

  onTaskDeleted(): void {
    this.tasksChanged.emit();
  }

  onTaskToggled(): void {
    this.tasksChanged.emit();
  }
}

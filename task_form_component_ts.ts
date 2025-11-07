// src/app/components/tasks/task-form/task-form.component.ts

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../../../core/models/task.model';
import { Category } from '../../../core/models/category.model';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | null = null;
  @Input() categories: Category[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  formData = {
    title: '',
    description: '',
    categoryId: 0,
    isCompleted: false
  };

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    if (this.task) {
      this.formData = {
        title: this.task.title,
        description: this.task.description,
        categoryId: this.task.categoryId,
        isCompleted: this.task.isCompleted
      };
    }
  }

  onSubmit(): void {
    if (this.formData.categoryId === 0) {
      this.errorMessage = 'Please select a category';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    if (this.task) {
      const updateRequest: UpdateTaskRequest = {
        id: this.task.id,
        title: this.formData.title,
        description: this.formData.description,
        categoryId: this.formData.categoryId,
        isCompleted: this.formData.isCompleted
      };

      this.taskService.updateTask(updateRequest).subscribe({
        next: () => {
          this.saved.emit();
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to update task';
          this.isLoading = false;
        }
      });
    } else {
      const createRequest: CreateTaskRequest = {
        title: this.formData.title,
        description: this.formData.description,
        categoryId: this.formData.categoryId
      };

      this.taskService.createTask(createRequest).subscribe({
        next: () => {
          this.saved.emit();
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to create task';
          this.isLoading = false;
        }
      });
    }
  }

  onClose(): void {
    this.close.emit();
  }
}

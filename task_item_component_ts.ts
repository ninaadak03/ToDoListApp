// src/app/components/tasks/task-item/task-item.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<void>();
  @Output() toggleComplete = new EventEmitter<void>();

  isDeleting: boolean = false;

  constructor(private taskService: TaskService) {}

  onToggleComplete(): void {
    this.taskService.toggleTaskComplete(this.task.id).subscribe({
      next: () => {
        this.toggleComplete.emit();
      },
      error: (error) => {
        console.error('Error toggling task:', error);
      }
    });
  }

  onEdit(): void {
    this.edit.emit(this.task);
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.isDeleting = true;
      this.taskService.deleteTask(this.task.id).subscribe({
        next: () => {
          this.delete.emit();
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          this.isDeleting = false;
        }
      });
    }
  }
}

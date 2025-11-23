import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../../models/expense';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-list.html',
  styleUrls: ['./expense-list.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  categories: Category[] = [];
  editingExpenseId: number = 0; // Initialize with 0 instead of null
  editingExpense: Expense = this.createEmptyExpense(); // Initialize with empty expense

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.loadExpenses();
    this.loadCategories();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
      },
      error: (error) => {
        console.error('Error loading expenses:', error);
      }
    });
  }

  loadCategories() {
    this.categories = [
      { id: 1, name: 'Food' },
      { id: 2, name: 'Transport' },
      { id: 3, name: 'Entertainment' },
      { id: 4, name: 'Utilities' },
      { id: 5, name: 'Other' }
    ];
  }

  startEdit(expense: Expense) {
    this.editingExpenseId = expense.id || 0;
    // Create a copy of the expense for editing
    this.editingExpense = { ...expense };
  }

  saveEdit() {
    if (this.editingExpenseId) {
      this.expenseService.updateExpense(this.editingExpenseId, this.editingExpense).subscribe({
        next: () => {
          console.log('Expense updated successfully');
          // Update local array
          const index = this.expenses.findIndex(exp => exp.id === this.editingExpenseId);
          if (index !== -1) {
            this.expenses[index] = { ...this.editingExpense };
          }
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error updating expense:', error);
          alert('Error updating expense');
        }
      });
    }
  }

  cancelEdit() {
    this.editingExpenseId = 0;
    this.editingExpense = this.createEmptyExpense();
  }

  deleteExpense(expenseId: number) {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(expenseId).subscribe({
        next: () => {
          console.log('Expense deleted successfully');
          // Remove from local array
          this.expenses = this.expenses.filter(exp => exp.id !== expenseId);
        },
        error: (error) => {
          console.error('Error deleting expense:', error);
          alert('Error deleting expense');
        }
      });
    }
  }

  private createEmptyExpense(): Expense {
    return {
      title: '',
      amount: 0,
      category: '',
      date: new Date(),
      description: ''
    };
  }

  // Helper method to check if we're editing
  isEditing(expenseId: number | undefined): boolean {
    return this.editingExpenseId === expenseId;
  }
}
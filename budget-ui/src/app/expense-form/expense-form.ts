import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../../models/expense';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './expense-form.html',
  styleUrls: ['./expense-form.css']
})
export class ExpenseForm implements OnInit {
  expense: Expense = {
    title: '',
    amount: 0,
    category: '',
    date: new Date(),
    description: ''
  };

  categories: Category[] = [];
  formSubmitted = false;
  isLoading = false;

  constructor(private expenseService: ExpenseService) {
    console.log('ExpenseForm constructor called');
  }

  ngOnInit() {
    console.log('ExpenseForm ngOnInit called');
    this.loadCategories();
  }

  loadCategories() {
    console.log('Loading categories...');
    this.categories = [
      { id: 1, name: 'Food' },
      { id: 2, name: 'Transport' },
      { id: 3, name: 'Entertainment' },
      { id: 4, name: 'Utilities' },
      { id: 5, name: 'Other' }
    ];
    console.log('Categories loaded:', this.categories);
  }

  onSubmit() {
    this.formSubmitted = true;
    this.isLoading = true;
    
    console.log('Form submitted!', this.expense);
    console.log('Form valid?', this.isFormValid());

    if (!this.isFormValid()) {
      console.log('Form is invalid, stopping submission');
      this.isLoading = false;
      return;
    }

    // Convert date string to Date object for the API
    const expenseToSubmit: Expense = {
      ...this.expense,
      date: new Date(this.expense.date)
    };

    console.log('Sending to API:', expenseToSubmit);

    this.expenseService.createExpense(expenseToSubmit).subscribe({
      next: (response) => {
        console.log('✅ Expense created successfully:', response);
        alert('Expense added successfully!');
        this.resetForm();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('❌ Error creating expense:', error);
        alert('Error adding expense. Check console for details.');
        this.isLoading = false;
      },
      complete: () => {
        console.log('API call completed');
        this.isLoading = false;
      }
    });
  }

  isFormValid(): boolean {
    return !!this.expense.title && 
           this.expense.amount > 0 && 
           !!this.expense.category && 
           !!this.expense.date;
  }

  resetForm() {
    this.expense = {
      title: '',
      amount: 0,
      category: '',
      date: new Date(),
      description: ''
    };
    this.formSubmitted = false;
  }
}
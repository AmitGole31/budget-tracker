import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../../models/expense';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  // FIX: Change to http (not https) and port 5023 (not 7000)
  private apiUrl = 'http://localhost:5023/api';

  constructor(private http: HttpClient) { }

  createExpense(expense: Expense): Observable<Expense> {
    // FIX: Add /expenses to the endpoint
    return this.http.post<Expense>(`${this.apiUrl}/expenses`, expense);
  }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/expenses`);
  }

  getExpense(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/expenses/${id}`);
  }

  // Remove duplicate method - use createExpense instead
  // addExpense(expense: Expense): Observable<Expense> {
  //   return this.http.post<Expense>(`${this.apiUrl}/expenses`, expense);
  // }

  updateExpense(id: number, expense: Expense): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/expenses/${id}`, expense);
  }

  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/expenses/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
}
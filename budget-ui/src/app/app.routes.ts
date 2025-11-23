import { Routes } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list';
import { ExpenseForm } from './expense-form/expense-form';

export const routes: Routes = [
  { path: '', component: ExpenseListComponent },
  { path: 'add', component: ExpenseForm },
  { path: '**', redirectTo: '' }
];

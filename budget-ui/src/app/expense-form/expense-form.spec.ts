import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ExpenseForm } from './expense-form';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../../models/expense';
import { Category } from '../../models/category';

describe('ExpenseFormComponent', () => {
  let component: ExpenseForm;
  let fixture: ComponentFixture<ExpenseForm>;
  let mockExpenseService: jasmine.SpyObj<ExpenseService>;

  const mockCategories: Category[] = [
    { id: 1, name: 'Food' },
    { id: 2, name: 'Transportation' }
  ];

  const mockExpense: Expense = {
    title: 'Test Expense',
    amount: 100,
    category: 'Food',
    date: new Date(),
    description: 'Test description'
  };

  beforeEach(async () => {
    const expenseServiceSpy = jasmine.createSpyObj('ExpenseService', ['createExpense']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, ExpenseForm],
      providers: [
        { provide: ExpenseService, useValue: expenseServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseForm);
    component = fixture.componentInstance;
    mockExpenseService = TestBed.inject(ExpenseService) as jasmine.SpyObj<ExpenseService>;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty expense', () => {
    expect(component.expense.title).toBe('');
    expect(component.expense.amount).toBe(0);
    expect(component.expense.category).toBe('');
    expect(component.expense.description).toBe('');
  });

  it('should have categories defined', () => {
    expect(component.categories.length).toBeGreaterThan(0);
    expect(component.categories[0].name).toBe('Food');
  });

  it('should call createExpense and reset form on successful submission', () => {
    // Arrange
    mockExpenseService.createExpense.and.returnValue(of(mockExpense));
    component.expense = { ...mockExpense };

    // Act
    component.onSubmit();

    // Assert
    expect(mockExpenseService.createExpense).toHaveBeenCalledWith(mockExpense);
    expect(component.expense.title).toBe('');
    expect(component.expense.amount).toBe(0);
    expect(component.expense.category).toBe('');
  });

  it('should handle error when createExpense fails', () => {
    // Arrange
    const errorResponse = new Error('API Error');
    mockExpenseService.createExpense.and.returnValue(throwError(() => errorResponse));
    spyOn(console, 'error');

    component.expense = { ...mockExpense };

    // Act
    component.onSubmit();

    // Assert
    expect(mockExpenseService.createExpense).toHaveBeenCalledWith(mockExpense);
    expect(console.error).toHaveBeenCalledWith('Error creating expense:', errorResponse);
  });

  it('should update expense properties when form is modified', () => {
    // Act
    component.expense.title = 'New Title';
    component.expense.amount = 50;
    component.expense.category = 'Transportation';
    component.expense.description = 'New description';

    // Assert
    expect(component.expense.title).toBe('New Title');
    expect(component.expense.amount).toBe(50);
    expect(component.expense.category).toBe('Transportation');
    expect(component.expense.description).toBe('New description');
  });
});
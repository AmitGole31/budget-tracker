import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ExpenseListComponent } from './expense-list';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../../models/expense';

describe('ExpenseListComponent', () => {
  let component: ExpenseListComponent;
  let fixture: ComponentFixture<ExpenseListComponent>;
  let mockExpenseService: jasmine.SpyObj<ExpenseService>;

  const mockExpenses: Expense[] = [
    {
      id: 1,
      title: 'Groceries',
      amount: 85.50,
      category: 'Food',
      date: new Date('2024-01-15'),
      description: 'Weekly grocery shopping'
    },
    {
      id: 2,
      title: 'Gas',
      amount: 45.00,
      category: 'Transportation',
      date: new Date('2024-01-14'),
      description: 'Car fuel'
    }
  ];

  beforeEach(async () => {
    const expenseServiceSpy = jasmine.createSpyObj('ExpenseService', ['getExpenses']);

    await TestBed.configureTestingModule({
      imports: [ExpenseListComponent],
      providers: [
        { provide: ExpenseService, useValue: expenseServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseListComponent);
    component = fixture.componentInstance;
    mockExpenseService = TestBed.inject(ExpenseService) as jasmine.SpyObj<ExpenseService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty expenses array', () => {
    expect(component.expenses).toEqual([]);
  });

  it('should load expenses on ngOnInit', () => {
    // Arrange
    mockExpenseService.getExpenses.and.returnValue(of(mockExpenses));

    // Act
    component.ngOnInit();

    // Assert
    expect(mockExpenseService.getExpenses).toHaveBeenCalled();
    expect(component.expenses).toEqual(mockExpenses);
  });

  it('should display no expenses message when array is empty', () => {
    // Arrange
    mockExpenseService.getExpenses.and.returnValue(of([]));
    
    // Act
    component.ngOnInit();
    fixture.detectChanges();

    // Assert
    const noExpensesElement = fixture.nativeElement.querySelector('.no-expenses');
    expect(noExpensesElement).toBeTruthy();
    expect(noExpensesElement.textContent).toContain('No expenses recorded yet.');
  });

  it('should display expenses in table when data is available', () => {
    // Arrange
    mockExpenseService.getExpenses.and.returnValue(of(mockExpenses));
    
    // Act
    component.ngOnInit();
    fixture.detectChanges();

    // Assert
    const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(tableRows.length).toBe(2);
    
    const firstRowCells = tableRows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent).toContain('Groceries');
    expect(firstRowCells[1].textContent).toContain('85.50');
    expect(firstRowCells[2].textContent).toContain('Food');
  });

  it('should handle error when loading expenses fails', () => {
    // Arrange
    const errorResponse = new Error('Failed to load expenses');
    mockExpenseService.getExpenses.and.returnValue(throwError(() => errorResponse));
    spyOn(console, 'error');

    // Act
    component.loadExpenses();

    // Assert
    expect(mockExpenseService.getExpenses).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error loading expenses:', errorResponse);
    expect(component.expenses).toEqual([]);
  });

  it('should call loadExpenses on component initialization', () => {
    // Arrange
    spyOn(component, 'loadExpenses');
    
    // Act
    component.ngOnInit();

    // Assert
    expect(component.loadExpenses).toHaveBeenCalled();
  });
});
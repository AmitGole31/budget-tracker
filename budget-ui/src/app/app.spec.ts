import { TestBed } from '@angular/core/testing';
import { RouterOutlet, RouterLink } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterOutlet, RouterLink]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'BudgetTracker' title`, () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('BudgetTracker');
  });

  it('should render header with navigation', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const header = compiled.querySelector('header');
    expect(header).toBeTruthy();
    
    const navLinks = compiled.querySelectorAll('.nav-link');
    expect(navLinks.length).toBe(2);
    expect(navLinks[0].textContent).toContain('Expense List');
    expect(navLinks[1].textContent).toContain('Add Expense');
  });

  it('should have router outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should have footer', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const footer = compiled.querySelector('footer');
    expect(footer).toBeTruthy();
    expect(footer?.textContent).toContain('BudgetTracker');
  });
});

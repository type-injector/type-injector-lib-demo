import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MockedIntegrationVaraintsComponent,
        MockedAuthenticatedScopeComponent,

        AppComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular'`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(app.title).toMatch(/^Hello Angular! Time is: [0-9:]+ (AM|PM)$/);
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toMatch(/^Hello Angular! Time is: [0-9:]+ (AM|PM)$/);
  });
});

@Component({
  selector: 'app-integration-variants',
  template: 'MockedIntegrationVaraintsComponent',
})
class MockedIntegrationVaraintsComponent {}

@Component({
  selector: 'app-authenticated-scope',
  template: 'MockedAuthenticatedScopeComponent',
})
class MockedAuthenticatedScopeComponent {}

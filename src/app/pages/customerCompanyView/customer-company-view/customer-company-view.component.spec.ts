import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompanyViewComponent } from './customer-company-view.component';

describe('CustomerCompanyViewComponent', () => {
  let component: CustomerCompanyViewComponent;
  let fixture: ComponentFixture<CustomerCompanyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCompanyViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCompanyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

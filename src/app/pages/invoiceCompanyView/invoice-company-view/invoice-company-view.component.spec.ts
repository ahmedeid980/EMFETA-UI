import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCompanyViewComponent } from './invoice-company-view.component';

describe('InvoiceCompanyViewComponent', () => {
  let component: InvoiceCompanyViewComponent;
  let fixture: ComponentFixture<InvoiceCompanyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceCompanyViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceCompanyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

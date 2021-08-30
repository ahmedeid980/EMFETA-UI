import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceLineCompanyViewComponent } from './invoice-line-company-view.component';

describe('InvoiceLineCompanyViewComponent', () => {
  let component: InvoiceLineCompanyViewComponent;
  let fixture: ComponentFixture<InvoiceLineCompanyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceLineCompanyViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceLineCompanyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

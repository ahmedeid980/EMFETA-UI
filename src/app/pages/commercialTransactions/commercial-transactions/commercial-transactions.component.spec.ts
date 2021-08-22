import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialTransactionsComponent } from './commercial-transactions.component';

describe('CommercialTransactionsComponent', () => {
  let component: CommercialTransactionsComponent;
  let fixture: ComponentFixture<CommercialTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CommercialTransactionGuard } from './commercial-transaction.guard';

describe('CommercialTransactionGuard', () => {
  let guard: CommercialTransactionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CommercialTransactionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

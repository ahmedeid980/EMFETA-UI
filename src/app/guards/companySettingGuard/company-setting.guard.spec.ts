import { TestBed } from '@angular/core/testing';

import { CompanySettingGuard } from './company-setting.guard';

describe('CompanySettingGuard', () => {
  let guard: CompanySettingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompanySettingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

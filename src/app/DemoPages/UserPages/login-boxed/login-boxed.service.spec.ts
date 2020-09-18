import { TestBed } from '@angular/core/testing';

import { LoginBoxedService } from './login-boxed.service';

describe('LoginBoxedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginBoxedService = TestBed.get(LoginBoxedService);
    expect(service).toBeTruthy();
  });
});

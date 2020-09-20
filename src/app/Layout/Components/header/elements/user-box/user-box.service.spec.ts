import { TestBed } from '@angular/core/testing';

import { UserBoxService } from './user-box.service';

describe('UserBoxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserBoxService = TestBed.get(UserBoxService);
    expect(service).toBeTruthy();
  });
});

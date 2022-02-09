import { TestBed, inject } from '@angular/core/testing';

import { AuthenicationService } from './authenication.service';

describe('AuthenicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenicationService]
    });
  });

  it('should be created', inject([AuthenicationService], (service: AuthenicationService) => {
    expect(service).toBeTruthy();
  }));
});

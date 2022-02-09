import { TestBed, inject } from '@angular/core/testing';

import { AlertNotifierService } from './alert-notifier.service';

describe('AlertNotifierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertNotifierService]
    });
  });

  it('should be created', inject([AlertNotifierService], (service: AlertNotifierService) => {
    expect(service).toBeTruthy();
  }));
});

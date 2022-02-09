import { TestBed, inject } from '@angular/core/testing';

import { DataChangeNotifierService } from './data-change-notifier.service';

describe('DataChangeNotifierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataChangeNotifierService]
    });
  });

  it('should be created', inject([DataChangeNotifierService], (service: DataChangeNotifierService) => {
    expect(service).toBeTruthy();
  }));
});

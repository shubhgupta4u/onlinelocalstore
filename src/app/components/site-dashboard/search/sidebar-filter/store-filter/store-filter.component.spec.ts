import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFilterComponent } from './store-filter.component';

describe('StoreFilterComponent', () => {
  let component: StoreFilterComponent;
  let fixture: ComponentFixture<StoreFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

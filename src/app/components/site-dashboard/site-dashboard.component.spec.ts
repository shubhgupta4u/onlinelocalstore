import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDashboardComponent } from './site-dashboard.component';

describe('SiteDashboardComponent', () => {
  let component: SiteDashboardComponent;
  let fixture: ComponentFixture<SiteDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

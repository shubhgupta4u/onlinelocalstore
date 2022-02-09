import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSidenavbarComponent } from './site-sidenavbar.component';

describe('SiteSidenavbarComponent', () => {
  let component: SiteSidenavbarComponent;
  let fixture: ComponentFixture<SiteSidenavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSidenavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSidenavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

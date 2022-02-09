import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteBannerComponent } from './site-banner.component';

describe('SiteBannerComponent', () => {
  let component: SiteBannerComponent;
  let fixture: ComponentFixture<SiteBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

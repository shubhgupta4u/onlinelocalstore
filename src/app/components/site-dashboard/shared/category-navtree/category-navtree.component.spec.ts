import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNavtreeComponent } from './category-navtree.component';

describe('CategoryNavtreeComponent', () => {
  let component: CategoryNavtreeComponent;
  let fixture: ComponentFixture<CategoryNavtreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryNavtreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNavtreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

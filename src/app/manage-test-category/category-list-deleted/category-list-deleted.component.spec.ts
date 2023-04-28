import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListDeletedComponent } from './category-list-deleted.component';

describe('CategoryListDeletedComponent', () => {
  let component: CategoryListDeletedComponent;
  let fixture: ComponentFixture<CategoryListDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryListDeletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryListDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

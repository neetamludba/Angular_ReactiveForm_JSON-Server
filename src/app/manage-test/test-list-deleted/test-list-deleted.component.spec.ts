import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestListDeletedComponent } from './test-list-deleted.component';

describe('TestListDeletedComponent', () => {
  let component: TestListDeletedComponent;
  let fixture: ComponentFixture<TestListDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestListDeletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestListDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

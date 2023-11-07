import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAttemptListComponent } from './test-attempt-list.component';

describe('TestAttemptListComponent', () => {
  let component: TestAttemptListComponent;
  let fixture: ComponentFixture<TestAttemptListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAttemptListComponent]
    });
    fixture = TestBed.createComponent(TestAttemptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAttemptDetailsComponent } from './test-attempt-details.component';

describe('TestAttemptDetailsComponent', () => {
  let component: TestAttemptDetailsComponent;
  let fixture: ComponentFixture<TestAttemptDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAttemptDetailsComponent]
    });
    fixture = TestBed.createComponent(TestAttemptDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

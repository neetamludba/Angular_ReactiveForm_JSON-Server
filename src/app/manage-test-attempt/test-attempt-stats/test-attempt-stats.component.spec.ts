import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAttemptStatsComponent } from './test-attempt-stats.component';

describe('TestAttemptStatsComponent', () => {
  let component: TestAttemptStatsComponent;
  let fixture: ComponentFixture<TestAttemptStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAttemptStatsComponent]
    });
    fixture = TestBed.createComponent(TestAttemptStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestAttemptComponent } from './view-test-attempt.component';

describe('ViewTestAttemptComponent', () => {
  let component: ViewTestAttemptComponent;
  let fixture: ComponentFixture<ViewTestAttemptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTestAttemptComponent]
    });
    fixture = TestBed.createComponent(ViewTestAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

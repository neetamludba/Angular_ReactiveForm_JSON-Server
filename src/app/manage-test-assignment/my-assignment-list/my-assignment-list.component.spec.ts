import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssignmentListComponent } from './my-assignment-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestAssignmentService } from '../test-assignment.service';

describe('MyAssignmentListComponent', () => {
  let component: MyAssignmentListComponent;
  let fixture: ComponentFixture<MyAssignmentListComponent>;
  let testAssignmentService: TestAssignmentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAssignmentListComponent],
      imports: [
        MatIconModule, // Import Angular Material icon module
        MatFormFieldModule, // Import Angular Material form field module
        HttpClientTestingModule, // Import the mock HttpClient module for testing HTTP requests
        MatInputModule, // Import Angular Material input module
        MatTableModule, // Import Angular Material table module
        MatSortModule, // Import Angular Material sorting module
        BrowserAnimationsModule // Import Angular animations module
      ]
    })
      .compileComponents(); // Compile the component and its template

    fixture = TestBed.createComponent(MyAssignmentListComponent);
    component = fixture.componentInstance;
    testAssignmentService = TestBed.inject(TestAssignmentService); // Initialize the test service from TestBed

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

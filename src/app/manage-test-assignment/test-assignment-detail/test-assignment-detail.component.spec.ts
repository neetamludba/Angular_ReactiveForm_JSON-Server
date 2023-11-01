import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAssignmentDetailComponent } from './test-assignment-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

describe('TestAssignmentDetailComponent', () => {
  let component: TestAssignmentDetailComponent;
  let fixture: ComponentFixture<TestAssignmentDetailComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<TestAssignmentDetailComponent>>; // Initialize a mock MatDialogRef

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj<MatDialogRef<TestAssignmentDetailComponent>>(
      ['close']
    );

    TestBed.configureTestingModule({
      declarations: [TestAssignmentDetailComponent],
      imports: [
        RouterTestingModule, // Import the mock RouterTestingModule
        HttpClientTestingModule, // Import the mock HttpClientTestingModule for testing HTTP requests
        MatCardModule, // Import Angular Material card module
        MatFormFieldModule, // Import Angular Material form field module
        MatInputModule, // Import Angular Material input module
        MatCheckboxModule, // Import Angular Material checkbox module
        ReactiveFormsModule, // Import the ReactiveFormsModule for forms
        MatDialogModule, // Import Angular Material dialog module
        MatRadioModule, // Import Angular Material radio module
        MatIconModule, // Import Angular Material icon module
        MatButtonModule, // Import Angular Material button module
        AngularEditorModule, // Import the Angular editor module
        BrowserAnimationsModule, // Import Angular animations module
        MatOptionModule, // Import Angular option module
        MatSelectModule // Import Angular select module
      ],
      providers: [
        TestAssignmentDetailComponent, // Provide the TestService as a dependency

        { provide: MatDialogRef, useValue: mockDialogRef }, // Use the mockDialogRef for MatDialog

        // Provide the necessary provider for MAT_DIALOG_DATA using the MAT_DIALOG_DATA injection token
        { provide: MAT_DIALOG_DATA, useValue: {} },

        // Provide a mock ActivatedRoute with a predefined 'id' parameter
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (param: string) => '1' // Set the 'id' parameter value to '1'
              }
            }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(TestAssignmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

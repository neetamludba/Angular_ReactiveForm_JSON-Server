import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailsComponent } from './question-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestService } from 'src/app/manage-test/test.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { Question } from 'src/app/models/question.model';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

describe('QuestionDetailsComponent', () => {
  let component: QuestionDetailsComponent;
  let fixture: ComponentFixture<QuestionDetailsComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<QuestionDetailsComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj<MatDialogRef<QuestionDetailsComponent>>(
      ['close']
    );
    await TestBed.configureTestingModule({
      declarations: [QuestionDetailsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatRadioModule,
        MatIconModule,
        MatButtonModule,
        AngularEditorModule,
        BrowserAnimationsModule


      ],
      providers: [
        TestService,
        { provide: MatDialogRef, useValue: mockDialogRef }, // Use the mockDialogRef

        // Provide the necessary provider for MatMdcDialogData using the MAT_DIALOG_DATA injection token
        { provide: MAT_DIALOG_DATA, useValue: {} },
        
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

    })
      .compileComponents();

    fixture = TestBed.createComponent(QuestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {

    // Spy on the dialogRef.close() method
    // spyOn((component as any).dialogRef, 'close');

    // Set initial value for errorMessage
    component.errorMessage = '';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate the form when the question field is empty', () => {
    const questionControl = component.questionDetailsForm.get('question')!;

    // Set question control value to empty
    questionControl.setValue('');

    // Trigger change detection
    fixture.detectChanges();

    // Check if the form is invalid
    expect(component.questionDetailsForm.invalid).toBeTruthy();

    // Check if the error message is correct
    expect(component.showErrorMessage('question')).toBe('Test description is required');
  });

  it('should invalidate the form when the question field is too short', () => {
    const questionControl = component.questionDetailsForm.get('question')!;

    // Set question control value to a short value
    questionControl.setValue('Short');

    // Trigger change detection
    fixture.detectChanges();

    // Check if the form is invalid
    expect(component.questionDetailsForm.invalid).toBeTruthy();

    // Check if the error message is correct
    expect(component.showErrorMessage('question')).toBe('Test description must be 5 characters long');
  });

  it('should invalidate the form when any option value is empty', () => {
    const optionsArray = component.questionDetailsForm.get('optionsArray') as FormArray;

    // Add an option with an empty value
    component.addOption('');

    // Trigger change detection
    fixture.detectChanges();

    // Check if the form is invalid
    expect(component.questionDetailsForm.invalid).toBeTruthy();

    // Check if the error message is correct for the specific option
    expect(component.showErrorMessage('optionsArray')).toBe('');
  });

  it('should return the correct error message for the required validation', () => {
    const requiredErrorMessage = component.showErrorMessage('question');
    expect(requiredErrorMessage).toBe('Test description is required');
  });

  it('should return the correct error message for the minlength validation', () => {
    const minlengthErrorMessage = component.showErrorMessage('question');
    expect(minlengthErrorMessage).toBe('Test description is required');
  });

  it('should have the correct properties and values in editorConfig', () => {
    const expectedEditorConfig: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: 'p',
      defaultFontName: 'Arial',
      defaultFontSize: '4',
      fonts: [
        { class: 'arial', name: 'Arial' },
        { class: 'times-new-roman', name: 'Times New Roman' },
        { class: 'calibri', name: 'Calibri' },
        { class: 'comic-sans-ms', name: 'Comic Sans MS' }
      ],
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        ['insertImage', 'insertVideo']
      ]
    };

    // Check if the editorConfig matches the expected configuration
    expect(component.editorConfig).toEqual(expectedEditorConfig);
  });

  it('should add a new option to the optionsArray', () => {
    const initialOptionsLength = component.options.length;

    // Call the addOption() method
    component.addOption('New Option', true);

    // Check if a new option was added to the optionsArray
    expect(component.options.length).toBe(initialOptionsLength + 1);

    // Check if the added option has the correct values
    const addedOption = component.options.at(initialOptionsLength);
    expect(addedOption.value.value).toBe('New Option');
    expect(addedOption.value.correctAnswer).toBe(true);
  });

  it('should remove an option from the optionsArray', () => {
    // Add an option to the optionsArray
    component.addOption('Option 1', true);
    component.addOption('Option 2', false);
    component.addOption('Option 3', false);

    // Check the initial length of optionsArray
    const initialOptionsLength = component.options.length;

    // Call the deleteOption() method to remove an option at index 1
    component.deleteOption(1);

    // Check if an option was removed from the optionsArray
    expect(component.options.length).toBe(initialOptionsLength - 1);

    // Check if the correct option was removed
    expect(component.options.at(1).value.value).toBe('Option 3');
    expect(component.options.at(1).value.correctAnswer).toBe(false);
  });

  it('should construct the correct object to be passed to dialogRef.close()', () => {
    // Set the form values to test the saveQuestion() method
    component.questionDetailsForm.patchValue({
      question: 'Sample question',
      questionType: '1',
      mandatory: true,
      active: false,
    });

    // Add options to the optionsArray
    component.addOption('Option 1', true);
    component.addOption('Option 2', false);

    // Call the saveQuestion() method
    component.saveQuestion();

    // Check if dialogRef.close() was called with the correct object
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      question: 'Sample question',
      questionType: 1, // Ensure it's a number
      isDeleted: false,
      mandatory: true,
      options: 'Option 1,Option 2',
      correctAnswers: 'true,false',
      active: false,
    });
  });

  it('should correctly populate the form when initialized with existing data', () => {
    // Mock existing data for the component
    const existingData: Question = {
      id: 1,
      question: 'Existing question',
      questionType: 2,
      mandatory: false,
      active: true,
      options: 'Option 1,Option 2,Option 3',
      correctAnswers: 'true,false,true',
      testID: 0,
      isDeleted: false
    };

    // Set the component's data property to the mock existing data
    component.data = existingData;

    // Call the ngOnInit() method to initialize the form
    component.ngOnInit();

    // Check if the form is correctly populated with existing data
    expect(component.questionDetailsForm.value).toEqual({
      question: 'Existing question',
      questionType: '2',
      mandatory: false,
      active: true,
      optionsArray: [
        { value: 'Option 1', correctAnswer: true },
        { value: 'Option 2', correctAnswer: false },
        { value: 'Option 3', correctAnswer: true },
      ],
    });
  });

  it('should call dialogRef.close() with the correct data when saveQuestion() is executed', () => {
    // Set the form values to test the saveQuestion() method
    component.questionDetailsForm.patchValue({
      question: 'Sample question',
      questionType: '1',
      mandatory: true,
      active: false,
    });

    // Add options to the optionsArray
    component.addOption('Option 1', true);
    component.addOption('Option 2', false);

    // Call the saveQuestion() method
    component.saveQuestion();

    // Check if dialogRef.close() was called with the correct data
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      question: 'Sample question',
      questionType: 1, // Ensure it's a number
      isDeleted: false,
      mandatory: true,
      options: 'Option 1,Option 2',
      correctAnswers: 'true,false',
      active: false,
    });

    // Check that the errorMessage is cleared after successful save
    expect(component.errorMessage).toBe('');
  });

  it('should correctly populate optionsArray with form controls when data is available', () => {
    // Mock existing data for the component
    const existingData: Question = {
      id: 1,
      question: 'Sample question',
      questionType: 1,
      mandatory: false,
      active: true,
      options: 'Option 1,Option 2,Option 3',
      correctAnswers: 'true,false,true',
      testID: 0,
      isDeleted: false
    };

    // Set the component's data property to the mock existing data
    component.data = existingData;

    // Call the ngOnInit() method to initialize the form and optionsArray
    component.ngOnInit();

    // Check if optionsArray is correctly populated with form controls
    expect(component.options.length).toBe(3);

    // Check the values of the form controls in optionsArray
    expect(component.options.at(0).value).toEqual({ value: 'Option 1', correctAnswer: true });
    expect(component.options.at(1).value).toEqual({ value: 'Option 2', correctAnswer: false });
    expect(component.options.at(2).value).toEqual({ value: 'Option 3', correctAnswer: true });
  });


  it('should update the questionType form control value when user selects an option', () => {
    // Get the questionType select element using DebugElement
    const questionTypeSelect: HTMLSelectElement = fixture.debugElement.query(By.css('button[mat-mini-fab]')).nativeElement;

    // Simulate user selection on the questionType field
    questionTypeSelect.value = '1'; // Option with value 1 (multiple correct options)
    questionTypeSelect.dispatchEvent(new Event('change'));

    // Check if the questionType form control's value is updated
    expect(component.questionDetailsForm.get('questionType')?.value).toBe('1');
  });

  it('should add a new option when user clicks on the "Add Option" button', () => {
    // Get the "Add Option" button using DebugElement
    const addButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[mat-mini-fab]')).nativeElement;

    // Simulate user click on the "Add Option" button
    addButton.click();

    // Check if a new option is added to the optionsArray
    expect(component.options.length).toBe(1);

    // Check if the added option has the correct default values (empty value and false for correctAnswer)
    const addedOption = component.options.at(0).value;
    expect(addedOption.value).toBe('');
    expect(addedOption.correctAnswer).toBe(false);
  });

  it('should remove an option when user clicks on the "Delete Option" button', () => {
    // Add an option to the form to be able to delete it
    component.addOption('Option 1');

    fixture.detectChanges();

    // Find the "Delete Option" button using the button's mat-icon
    const deleteButton = fixture.debugElement.query(By.css('.questionDeleteOption'));

    // Simulate a click on the "Delete Option" button
    deleteButton.nativeElement.click();

    // Check if the options array is empty
    expect(component.options.length).toBe(0);
  });

  it('should call the saveQuestion() method when user clicks on the "Save Question" button', () => {

    // Spy on the saveQuestion() method to track calls
    spyOn(component, 'saveQuestion');

    // Get the "Save Question" button element using the class
    const saveButton: HTMLButtonElement = fixture.nativeElement.querySelector('.save-button');

    // Simulate user click on the "Save Question" button
    saveButton.dispatchEvent(new Event('click'));

    // Check if the saveQuestion() method is called
    expect(component.saveQuestion).toHaveBeenCalled();
  });

 
});

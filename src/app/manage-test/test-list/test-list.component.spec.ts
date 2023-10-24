// Import necessary modules and components for testing.
import { ComponentFixture, TestBed } from '@angular/core/testing'; // Angular testing utilities
import { TestListComponent } from './test-list.component'; // The component being tested
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Mock HttpClient for testing HTTP requests
import { MatFormFieldModule } from '@angular/material/form-field'; // Angular Material form field module
import { MatIconModule } from '@angular/material/icon'; // Angular Material icon module
import { MatInputModule } from '@angular/material/input'; // Angular Material input module
import { MatSortModule } from '@angular/material/sort'; // Angular Material sorting module
import { MatTableModule } from '@angular/material/table'; // Angular Material table module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Angular animations module
import { TestCategory } from 'src/app/models/category.model'; // Model for test categories
import { MatTableDataSource } from '@angular/material/table'; // Angular Material data source for tables
import { TestService } from '../test.service'; // The service used in the component
import { Test } from 'src/app/models/test.model'; // Model for tests

// Describe the test suite for the 'TestListComponent'.
describe('TestListComponent', () => {
  let component: TestListComponent; // Initialize the component being tested
  let fixture: ComponentFixture<TestListComponent>; // Initialize a test fixture for the component
  let testService: TestService; // Initialize the service used in the component

  // Set up the testing environment before running the tests.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestListComponent], // Declare the component to be tested
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

    fixture = TestBed.createComponent(TestListComponent); // Create a fixture for the component
    component = fixture.componentInstance; // Initialize the component from the fixture
    testService = TestBed.inject(TestService); // Initialize the test service from TestBed
    fixture.detectChanges(); // Trigger change detection for the component
  });


  // Run a test to ensure that the component is created successfully.
  it('should create', () => {
    expect(component).toBeTruthy(); // Expect that the component is truthy (it exists)
  });

  // Step 1: Describe the test case
  it('should retrieve all test categories on initialization', async () => {

    // Step 2: Prepare mock data for test categories
    const categories: TestCategory[] = [
      { id: 1, categoryName: 'Category 1', active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false },
      { id: 2, categoryName: 'Category 2', active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false },
    ];

    // Step 3: Create a spy to mock the 'getAllCategories' function of the testService
    spyOn(testService, 'getAllCategories').and.returnValue(Promise.resolve(categories));

    // Step 4: Call the component's initialization function
    component.ngAfterViewInit();

    // Step 5: Verify that 'getAllCategories' was called and the testCategories were set correctly
    await expect(testService.getAllCategories).toHaveBeenCalled();
    expect(component.testCategories).toEqual(categories);
  });

  // Step 1: Describe the test case
  it('should retrieve all tests on initialization', async () => {
    // Step 2: Prepare mock data for tests

    const tests: Test[] = [
      { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false },
      { id: 2, description: 'Test 2', categoryID: 2, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false },
    ];

    // Step 3: Create a spy to mock the 'getAllTest' function of the testService
    spyOn(testService, 'getAllTest').and.returnValue(Promise.resolve(tests));

    // Step 4: Call the component's initialization function
    component.ngAfterViewInit();

    // Step 5: Verify that 'getAllTest' was called and the tests were set correctly
    await expect(testService.getAllTest).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(tests);
  });

  // Step 1: Filter tests by description and verify the filtered data
  it('should filter tests by description', async () => {
    const tests: Test[] = [
      { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false },
      { id: 2, description: 'Test 2', categoryID: 2, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false },
    ];
    component.dataSource = new MatTableDataSource<Test>(tests);

    // Step 2: Call the filtering function and check the filtered data
    await component.doFilter('Test 1');
    expect(component.dataSource.filteredData).toEqual([tests[0]]);
  });

  // Step 1: Test navigation to the test details page
  it('should navigate to test details page when createTest called', async () => {
    const navigateByUrlSpy = spyOn(component['router'], 'navigateByUrl');
    navigateByUrlSpy.and.stub();

    // Step 2: Trigger change detection, wait for stability, and call the createTest function
    fixture.detectChanges();
    await fixture.whenStable();
    component.createTest();

    // Step 3: Verify that 'navigateByUrl' was called with the expected URL
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/test/create');
  });

  // Step 1: Test navigation to the deleted test list page
  it('should navigate to deleted test page when gotoDeletedTests called', async () => {
    const navigateByUrlSpy = spyOn(component['router'], 'navigateByUrl');
    navigateByUrlSpy.and.stub();

    // Step 2: Trigger change detection, wait for stability, and call the gotoDeletedTests function
    fixture.detectChanges();
    await fixture.whenStable();
    component.gotoDeletedTests();

    // Step 3: Verify that 'navigateByUrl' was called with the expected URL
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/test/deleted');
  });

  // Step 1: Test the deletion of a test
  it('should delete test when deleteTest called', async () => {
    const tests: Test[] = [
      { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false },
      { id: 2, description: 'Test 2', categoryID: 2, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false },
    ];
    const deleteTestSpy = spyOn(testService, 'deleteTest').and.returnValue(Promise.resolve());

    // Step 2: Call the deleteTest function and verify the test is deleted
    await component.deleteTest(1);
    component.dataSource = new MatTableDataSource<Test>(tests);
    expect(deleteTestSpy).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(tests);
  });


});

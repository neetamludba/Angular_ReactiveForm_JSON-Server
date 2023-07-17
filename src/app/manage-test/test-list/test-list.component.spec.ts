import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestListComponent } from './test-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestCategory } from 'src/app/models/category.model';
import { MatTableDataSource } from '@angular/material/table';
import { TestService } from '../test.service';
import { Test } from 'src/app/models/test.model';

describe('TestListComponent', () => {
  let component: TestListComponent;
  let fixture: ComponentFixture<TestListComponent>;
  let testService: TestService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestListComponent ],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        BrowserAnimationsModule
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestListComponent);
    component = fixture.componentInstance;
    testService = TestBed.inject(TestService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve all test categories on initialization',async () => {
    
    const categories: TestCategory[] = [
      { id: 1, categoryName: 'Category 1', active: true, createdDate: new Date(12-7-2023), isDeleted: false },
      { id: 2, categoryName: 'Category 2', active: true, createdDate: new Date(12-7-2023), isDeleted: false},
    ];
    spyOn(testService, 'getAllCategories').and.returnValue(Promise.resolve(categories));

    component.ngAfterViewInit();

    await expect(testService.getAllCategories).toHaveBeenCalled();
    expect(component.testCategories).toEqual(categories);
  });


  it('should retrieve all tests on initialization',async () => {

    const tests: Test[] = [
      { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12-7-2023), isDeleted: false },
      { id: 2, description: 'Test 2', categoryID: 2, active: true, createdDate: new Date(12-7-2023), isDeleted: false},
    ];
    spyOn(testService, 'getAllTest').and.returnValue(Promise.resolve(tests));

    component.ngAfterViewInit();

    await expect(testService.getAllTest).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(tests);
  });

  it('should filter tests by description', async() => {
    const tests: Test[] = [
      { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12-7-2023), isDeleted: false },
      { id: 2, description: 'Test 2', categoryID: 2, active: true, createdDate: new Date(12-7-2023), isDeleted: false},
    ];
    component.dataSource = new MatTableDataSource<Test>(tests);
    await component.doFilter('Test 1');
    expect(component.dataSource.filteredData).toEqual([tests[0]]);
  });

 it('should navigate to test details page when createTest called', async() => {
  const navigateByUrlSpy = spyOn(component['router'], 'navigateByUrl');
  navigateByUrlSpy.and.stub();

  fixture.detectChanges();
  await fixture.whenStable();

  component.createTest();

  expect(navigateByUrlSpy).toHaveBeenCalledWith('/test/create')
  });

  it('should navigate to deleted test page when gotoDeletedTests called', async() => {
    const navigateByUrlSpy = spyOn(component['router'], 'navigateByUrl');
    navigateByUrlSpy.and.stub();
  
    fixture.detectChanges();
    await fixture.whenStable();
  
    component.gotoDeletedTests();
  
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/test/deleted')
    })

it('should delete test when deleteTest called', async() => {
  const tests: Test[] = [
    { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12-7-2023), isDeleted: false },
    { id: 2, description: 'Test 2', categoryID: 2, active: true, createdDate: new Date(12-7-2023), isDeleted: false},
  ];
  const deleteTestSpy = spyOn(testService, 'deleteTest').and.returnValue(Promise.resolve());
  await component.deleteTest(1);
  component.dataSource = new MatTableDataSource<Test>(tests);
  expect(deleteTestSpy).toHaveBeenCalled();
  expect(component.dataSource.data).toEqual(tests);
 
});


});

import { Component, ViewChild, AfterViewInit } from '@angular/core';

// We are importing MatTableDataSource and MatSort from the @angular/material module, 
// which is a UI component library for Angular. 
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// We also import Router from the @angular/router module to allow us to navigate to other components. 
import { Router } from '@angular/router';

// Finally, we import our own TestCategory model and TestCategoryService from our application.
import { Test } from 'src/app/models/test.model';
import { TestCategory } from 'src/app/models/category.model';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-list-deleted',
  templateUrl: './test-list-deleted.component.html',
  styleUrls: ['./test-list-deleted.component.css']
})
export class TestListDeletedComponent implements AfterViewInit {

  constructor(
    public router: Router,
    private testService: TestService
  ) { }

  // We use ViewChild decorator to access the MatSort instance and assign it to the sort property of the component.
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  // We also define a displayedColumns array that contains the names of columns to be displayed in the table, 
  // and a dataSource property that is initialized with an empty array of TestCategory objects.
  displayedColumns: string[] = [
    'description',
    'category',
    'active',
    'createdDate',
    'actions',
  ];
  dataSource = new MatTableDataSource<Test>([]);

  testCategories: TestCategory[] = [];
  // The ngAfterViewInit method is called after the view is initialized, and it calls the getCategories method to populate the table with data.
  ngAfterViewInit() {
    this.getAllDeletedTest();
    this.getAllTestCategories();
  }

  // The doFilter method is used to filter the data source when the user types in the filter input field.
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  // The getCategories method calls the getAllCategories method of the TestCategoryService to fetch all categories from the backend. 
  // It then assigns the resulting array to the dataSource property and sets the MatSort instance to the sort property of the data source.
  getAllDeletedTest() {
    this.testService.getAllTest()
      // The Promise returned from the deleteCategory method is then resolved with an array of categories.
      .then((categories) => {
        // The categories array is filtered to only include objects where the isDeleted flag is false.
        let filteredTests = categories.filter((object: { isDeleted: boolean }) => {
          return object.isDeleted == true
        });
        // The filtered categories are set as the dataSource for a MatTable, which is used to display the categories.
        this.dataSource = new MatTableDataSource<Test>(filteredTests);
        // Sorts the dataSource by a specified column using a MatSort.
        this.dataSource.sort = this.sort;
      })
      .catch((error) => console.log(error))

  }

  getAllTestCategories() {
    this.testService
      .getAllCategories()
      .then((categories) => {
        this.testCategories = categories;
      })
      .catch((err) => console.log(err));
  }



  // This function takes in a categoryId number and deletes the corresponding category
  unDeleteTest(testId: any) {
    // Calls the deleteCategory method from the testCategoryService with an object containing the categoryId and a flag isDeleted set to true.
    this.testService.unDeleteTest(testId)
      .catch((ex) => console.log(ex));
    this.getAllTestCategories();
    this.getAllDeletedTest();

  }

  backToTest() {
    this.router.navigateByUrl('test').catch((error) =>
      console.log(error));
  }

}

import { Component, ViewChild, AfterViewInit } from '@angular/core';

// We are importing MatTableDataSource and MatSort from the @angular/material module, 
// which is a UI component library for Angular. 
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// We also import Router from the @angular/router module to allow us to navigate to other components. 
import { Router } from '@angular/router';

// Finally, we import our own TestCategory model and TestCategoryService from our application.
import { TestCategory } from 'src/app/models/category.model';
import { TestCategoryService } from '../test-category.service';

@Component({
  selector: 'app-category-list-deleted',
  templateUrl: './category-list-deleted.component.html',
  styleUrls: ['./category-list-deleted.component.css']
})
export class CategoryListDeletedComponent implements AfterViewInit{
    
    constructor(
      public router: Router,
      private testCategoryService: TestCategoryService
    ) { } // A constructor that injects Router, ActivatedRoute, and TestCategoryService dependencies
  
  // We use ViewChild decorator to access the MatSort instance and assign it to the sort property of the component.
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  // We also define a displayedColumns array that contains the names of columns to be displayed in the table, 
  // and a dataSource property that is initialized with an empty array of TestCategory objects.
  displayedColumns: string[] = ['categoryName', 'active', 'createdDate', 'actions']
  dataSource = new MatTableDataSource<TestCategory>([]);

  // The ngAfterViewInit method is called after the view is initialized, and it calls the getCategories method to populate the table with data.
  ngAfterViewInit() {
    this.getAllDeletedCategories();
  }

  // The doFilter method is used to filter the data source when the user types in the filter input field.
  doFilter(value: string):void {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  // The getCategories method calls the getAllCategories method of the TestCategoryService to fetch all categories from the backend. 
  // It then assigns the resulting array to the dataSource property and sets the MatSort instance to the sort property of the data source.
  getAllDeletedCategories() {
    this.testCategoryService.getAllCategories()
      // The Promise returned from the deleteCategory method is then resolved with an array of categories.
      .then((categories) => {
        // The categories array is filtered to only include objects where the isDeleted flag is false.
        let filteredCategories = categories.filter((object: { isDeleted: boolean }) => {
          return object.isDeleted == true
        });
        // The filtered categories are set as the dataSource for a MatTable, which is used to display the categories.
        this.dataSource = new MatTableDataSource<TestCategory>(filteredCategories);
        // Sorts the dataSource by a specified column using a MatSort.
        this.dataSource.sort = this.sort;
      })
      .catch((error) => console.log(error))

  }




  // This function takes in a categoryId number and deletes the corresponding category
  unDeleteCategory(categoryId: any) {
    // Calls the deleteCategory method from the testCategoryService with an object containing the categoryId and a flag isDeleted set to true.
    this.testCategoryService.unDeleteCategory(categoryId)
    
    this.getAllDeletedCategories();

  }
  
  backToCategories(){
    this.router.navigateByUrl('testCategory')
  }
}

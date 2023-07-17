import { Component, OnInit } from '@angular/core'; // Importing Component and OnInit from Angular core module

import { FormGroup, FormControl, Validators } from '@angular/forms' // Importing FormGroup, FormControl, and Validators from Angular forms module
import { Router, ActivatedRoute } from '@angular/router'; // Importing Router and ActivatedRoute from Angular router module
import { TestCategoryService } from '../test-category.service'; // Importing TestCategoryService from test-category.service file in the same directory

import { formatDate } from '@angular/common';  // Importing formatDate function from Angular common module

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})

export class CategoryDetailsComponent implements OnInit {  // A class that defines the behavior of the component and implements the OnInit interface
  
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private testCategoryService: TestCategoryService
  ) { } // A constructor that injects Router, ActivatedRoute, and TestCategoryService dependencies

  ngOnInit(): void {  // A lifecycle hook that runs when the component is initialized

    let id = Number(this.route.snapshot.paramMap.get('id'));  // Getting the 'id' parameter from the current route snapshot

    if (id > 0 && !isNaN(id)) { // Checking if the 'id' parameter is valid

      this.categoryId = id; // Assigning the 'id' parameter to the categoryId property
      this.getCategory(this.categoryId); // Calling the getCategory method with the categoryId parameter

    }
  }

  categoryDetailsForm = new FormGroup({ // A new instance of FormGroup that defines the form controls and their validators
    categoryName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    active: new FormControl(true),
  })

  categoryId: number = 0; // A property that holds the category ID
  currentDate = new Date; // A property that holds the current date
  categoryDate = formatDate(this.currentDate, 'yyyy-MM-dd hh:mm a', 'en-US'); // A property that holds the formatted current date using the formatDate function

  showErrorMessage(fieldName: string) { // A method that returns an error message based on the form control's validation errors
    let errors = this.categoryDetailsForm.get(fieldName)?.errors; // Getting the validation errors of the specified form control

    
      if (errors && errors['required']) 
      return 'Category name is required'; // Returning an error message for the 'required' validator
      
      if (errors && errors['minlength']) 
      return 'Category name must be 5 characters long'; // Returning an error message for the 'minlength' validator
     else return '';
  }


  // This function gets the details of a category based on its ID
  // It calls the testCategoryService to retrieve all categories and then finds the category with the matching categoryId.
  // It then updates the categoryDetailsForm with the retrieved category details
  // Parameters: categoryId - a number representing the category ID
  // Returns: None
  getCategory(categoryId: number) {
    // Call the testCategoryService to retrieve all categories
    this.testCategoryService.getCategory(categoryId)
      .then((category) => {
        
        console.table(category);

        // Update the categoryDetailsForm with the retrieved category details
        this.categoryDetailsForm.setValue({
          categoryName: category.categoryName,
          active: category.active
        }
        )
      })
  }
  // This function saves the form data for a category by calling the testCategoryService's saveCategory method
  // It then navigates to the testCategory page
  // Parameters: None
  // Returns: None
  saveForm() {
    // Call the testCategoryService's saveCategory method with the form data
    this.testCategoryService.saveCategory({
      id: this.categoryId,
      categoryName: this.categoryDetailsForm.get('categoryName')?.value,
      active: this.categoryDetailsForm.get('active')?.value,
      createdDate: this.categoryDate,
      isDeleted: false
    })
      .then(() =>
        // Navigate to the testCategory page if the save is successful
        this.router.navigateByUrl('testCategory')
      )
  }

  // This function resets the categoryDetailsForm and logs a message to the console
  // Parameters: None
  // Returns: None
  resetForm() {
    // Log a message to the console
    console.log('Reset Button Works ');

    this.categoryDetailsForm.patchValue({  // Use patchValue instead of reset to set specific values
      categoryName: '',
      active: false
    });

  }

  // This function cancels the form and navigates to the testCategory page
  // Parameters: None
  // Returns: None
  cancelForm() {
    // Navigate to the testCategory page
    this.router.navigateByUrl('testCategory')
  }
}

import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestService } from '../test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TestCategory } from 'src/app/models/category.model';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent {
  constructor(
    private testService: TestService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  
  testDetailsForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    categoryID: new FormControl(''),
    active: new FormControl(true),
  });

  testId: number = 0;
  currentDate = new Date; // A property that holds the current date
  testDate = formatDate(this.currentDate, 'dd-MM-yyyy hh:mm a', 'en-US'); // A property that holds the formatted current date using the formatDate function

  testCategories: TestCategory[] = [];

  // displayedColumns: string[] = [
  //   'question',
  //   'questionType',
  //   'displayOrder',
  //   'active',
  //   'actions',
  // ];

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  ngOnInit(): void {
    this.getTestCategories();

    let id = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(id) && id > 0) {
      this.testId = id;
      this.getTest(this.testId);
    }
  }

  showErrorMessage(fieldName: string) {
    let errors = this.testDetailsForm.get(fieldName)?.errors;

    if (errors) {
      //console.log({ fieldName }, { errors }, errors['required']);

      if (errors['required']) return 'Test description is required';
      if (errors['minlength'])
        return 'Test description must be 5 characters long';
      return '';
    } else return '';
  }

  doFilter(value: string) {
    // this.dsQuestions.filter = value.trim().toLocaleLowerCase();
  }

  getTestCategories() {
    this.testService
      .getAllCategories()
      .then((categories) => {
        this.testCategories = categories;
      })
      .catch((err) => console.log(err));
  }

  changeCategory(e: any) {
    this.testDetailsForm.setValue(
      {
        categoryID: e.target.value,
        description: null,
        active: null
      }
    );
  }

  getTest(testId: number) {
    this.testService.getTest(testId).then((test) => {
    
      this.testDetailsForm.setValue({
        description: test.description,
        categoryID: test.categoryID,
        active: test.active,
      });
    });
    // this.testService.getMatchedTestQuestions(testId).then((testQuestions) => {
      // this.dsQuestions = new MatTableDataSource<Question>(testQuestions);
      // this.dsQuestions.sort = this.sort;
      // this.testQuestions = testQuestions;
    // })
  }
  saveTest() {
    this.testService
      .saveTest(
        {
          id: this.testId,
          description: this.testDetailsForm.get('description')?.value,
          categoryID: this.testDetailsForm.get('categoryID')?.value,
          active: Boolean(this.testDetailsForm.get('active')?.value),
          createdDate: this.testDate,
          isDeleted: false,
          // questions: this.testQuestions.slice(),
        },
      )
      .then(() =>
        this.router.navigateByUrl('test').catch((error) => {
          console.log(error);
        })
      )
      .catch((ex) => console.log(ex));
  }

  closeForm() {
    this.router.navigateByUrl('test').catch((error) => {
      console.log(error);
    });
  }
  resetForm() {
    this.testDetailsForm.reset();
  }

}

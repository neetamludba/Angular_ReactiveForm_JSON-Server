import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestService } from '../test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TestCategory } from 'src/app/models/category.model';
import { formatDate } from '@angular/common';
import { Question } from 'src/app/models/question.model';
import { MatDialog } from '@angular/material/dialog';
import { QuestionDetailsComponent } from 'src/app/manage-question/question-details/question-details.component';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})

export class TestDetailsComponent {
  constructor(
    private testService: TestService,
    public route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  testDetailsForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    categoryID: new FormControl(),
    active: new FormControl(true),
  });

  testId: number = 0;
  currentDate = new Date; // A property that holds the current date
  testDate = formatDate(this.currentDate, 'yyyy-MM-dd hh:mm a', 'en-US'); // A property that holds the formatted current date using the formatDate function

  testCategories: TestCategory[] = [];
  testQuestions: any = [];
  filteredTestQuestions: any = [];
  deletedTestQuestions: any = [];
  dsQuestions = new MatTableDataSource<Question>([]);
  dsDeletedQuestions = new MatTableDataSource<Question>([]);

  displayedColumns: string[] = [
    'question',
    'questionType',
    'active',
    'actions',
  ];

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  ngOnInit(): void {
    this.getTestCategories();

    let id = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(id) && id > 0) {
      this.testId = id;
      this.getTest(this.testId);
      this.getMatchedTestQuestions(this.testId);
    }
  }

  showErrorMessage(fieldName: string) {
    let errors = this.testDetailsForm.get(fieldName)?.errors;

    if (errors) {
      //console.log({ fieldName }, { errors }, errors['required']);

      if (errors['required']) return 'Test description is required';
      if (errors['minlength'])
        return 'Test description must be 5 characters long';
      else return '';
    } else return '';
  }

  doFilter(value: string) {
    this.dsQuestions.filter = value.trim().toLocaleLowerCase();
  }

  doFilterDeleted(value: string) {
    this.dsDeletedQuestions.filter = value.trim().toLocaleLowerCase();
  }

  getTestCategories() {
    this.testService
      .getAllCategories()
      .then((categories) => {
        this.testCategories = categories;
      })
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

  editQuestion(questionIndex: number) {
    let question;

    if (questionIndex === -1)
      question = {
        id: -1,
        testID: this.testId,
        options: 'a,b,c',
      };
    else question = this.filteredTestQuestions[questionIndex];

    // console.log({ questionIndex }, { question });

    const dialogRef = this.dialog.open(QuestionDetailsComponent, {
      data: question,
      width: '750px',
    });


    dialogRef.afterClosed().
      subscribe((result: any) => {
        if (result) {
          if (questionIndex === -1) {
            this.filteredTestQuestions.push({
              id: 0,
              testID: this.testId,
              ...result,
            });
          } else {
            const crntQuestion = this.filteredTestQuestions[questionIndex];

            this.filteredTestQuestions[questionIndex] = {
              ...crntQuestion,
              ...result,
            };
          }
          this.dsQuestions = new MatTableDataSource<Question>(this.filteredTestQuestions);

          this.testDetailsForm.markAsDirty();
        }
      })
  }

  getTest(testId: number) {
    this.testService.getTest(testId).then((test) => {

      this.testDetailsForm.setValue({
        description: test.description,
        categoryID: test.categoryID,
        active: test.active,
      });
    });

  }

  getMatchedTestQuestions(testId: number) {
    this.testService.getMatchedTestQuestions(testId).then((testQuestions) => {
      this.testQuestions = testQuestions;

      this.filteredTestQuestions = this.testQuestions.filter((Object: { isDeleted: boolean }) => Object.isDeleted === false);
      this.dsQuestions = new MatTableDataSource<Question>(this.filteredTestQuestions);
      this.dsQuestions.sort = this.sort;

      this.deletedTestQuestions = this.testQuestions.filter((Object: { isDeleted: boolean }) => Object.isDeleted === true);
      this.dsDeletedQuestions = new MatTableDataSource<Question>(this.deletedTestQuestions);
      this.dsDeletedQuestions.sort = this.sort;
    })
  }
  async saveTest() {
    this.testQuestions = this.filteredTestQuestions.concat(this.deletedTestQuestions);
    try {
      await this.testService
        .saveTest(
          {
            id: this.testId,
            description: this.testDetailsForm.get('description')?.value,
            categoryID: this.testDetailsForm.get('categoryID')?.value,
            active: Boolean(this.testDetailsForm.get('active')?.value),
            createdDate: this.testDate,
            isDeleted: false,
            questions: this.testQuestions.slice(),
          });

      this.router.navigateByUrl('/test')
    } catch (error) {
      console.log(error);
  }
}

  deleteQuestion(questionIndex: number) {
    const crntQuestion = this.filteredTestQuestions[questionIndex];
    this.filteredTestQuestions[questionIndex] = {
      ...crntQuestion,
      isDeleted: true,
    };
    // add the question to the deletedTestQuestions array
    this.deletedTestQuestions.push(this.filteredTestQuestions[questionIndex]);
    // remove the question from the filteredTestQuestions array
    this.filteredTestQuestions.splice(questionIndex, 1);
    this.dsQuestions = new MatTableDataSource<Question>(this.filteredTestQuestions);
    this.dsQuestions.sort = this.sort;

    this.dsDeletedQuestions = new MatTableDataSource<Question>(this.deletedTestQuestions);
    this.dsDeletedQuestions.sort = this.sort;

    this.testDetailsForm.markAsDirty();
  }

  addQuestion(questionIndex: number) {
    const crntQuestion = this.deletedTestQuestions[questionIndex];
    this.deletedTestQuestions[questionIndex] = {
      ...crntQuestion,
      isDeleted: false,
    };
    // add the question to the filteredTestQuestions array
    this.filteredTestQuestions.push(this.deletedTestQuestions[questionIndex]);
    // remove the question from the deletedTestQuestions array
    this.deletedTestQuestions.splice(questionIndex, 1);
    this.dsQuestions = new MatTableDataSource<Question>(this.filteredTestQuestions);
    this.dsQuestions.sort = this.sort;

    this.dsDeletedQuestions = new MatTableDataSource<Question>(this.deletedTestQuestions);
    this.dsDeletedQuestions.sort = this.sort;

    this.testDetailsForm.markAsDirty();
  }


  closeForm() {
    this.router.navigateByUrl('/test')
  }

}

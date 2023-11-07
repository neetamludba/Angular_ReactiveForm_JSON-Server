import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Answer } from 'src/app/models/answer.model';
import { Question } from 'src/app/models/question.model';
import { TestAttemptService } from '../test-attempt.service';
import { TestAssignmentService } from 'src/app/manage-test-assignment/test-assignment.service';
import { formatDate } from '@angular/common';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-test-attempt-details',
  templateUrl: './test-attempt-details.component.html',
  styleUrls: ['./test-attempt-details.component.css']
})

export class TestAttemptDetailsComponent implements OnInit {

  // Define timer-related properties
  private startTime: number = 0;
  private timerSubscription: Subscription | undefined;
  timeTaken: number = 0; // Variable to store the time taken for the current question

  constructor(
    private assignmentService: TestAssignmentService,
    private testAttemptService: TestAttemptService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  attemptDetailsForm = this.formBuilder.group({
    answersArray: this.formBuilder.array([]),
  });

  assignment: any;
  testAssignmentID: number = 0;
  questions: Question[] = [];
  answers: Answer[] = [];
  testName: string = '';
  currentQuestionIndex = -1;

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(id) && id > 0) {
      this.testAssignmentID = id;
      this.getAssignmentDetails(this.testAssignmentID);
    }
  }

  get answersArray() {
    return this.attemptDetailsForm.controls['answersArray'] as FormArray;
  }

  answerControl(index: number) {
    return this.answersArray.controls[index] as FormControl;
  }

  answerGroup(index: number) {
    return this.answersArray.controls[index] as FormGroup;
  }

  getAssignmentDetails(testAssignmentId: number) {
    this.assignmentService
      .getAssignment(testAssignmentId)
      .then((assignment) => {

        this.assignment = assignment;
        // console.log(assignment)
        this.getTest(assignment!.testID);
      });
  }

  getTest(testId: number) {
    this.testAttemptService.getTestWithQuestions(testId).then((test) => {
      // console.log(test)
      this.questions = test.questions
      this.testName = test.description;

      this.questions.sort((a, b) => a.id - b.id);
      this.questions.forEach((q: Question) => {
        if (q.questionType === 2) {
          let checkboxFormGroup = new FormGroup({});

          q.options.split(',').forEach((option: string, index: number) => {
            checkboxFormGroup.addControl('chk_' + index, new FormControl(''));
          });

          this.answersArray.push(checkboxFormGroup);
        } else
          this.answersArray.push(new FormControl('', [Validators.required]));

        this.startTimer();
      });

      this.currentQuestionIndex = 0;
    });
  }

  // Start the timer
  startTimer() {
    this.startTime = Date.now();
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      this.timeTaken = Math.floor((Date.now() - this.startTime) / 1000);
    });
  }

  // Stop and unsubscribe from the timer
  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  gotoNextQuestion() {
    this.stopTimer(); // Stop the timer for the current question
    this.currentQuestionIndex++;
    this.startTimer(); // Start the timer for the next question  }
  }

  goBackToQuestion() {
    this.currentQuestionIndex--;
  }

  submitAttempt() {
    this.stopTimer(); // Stop the timer before submitting

    const currentDate = new Date;
    const attemptDate = formatDate(currentDate, 'yyyy-MM-dd hh:mm a', 'en-US');

    const answers = this.answersArray.controls.map((answer, index: number) => {
      // console.log('#' + index + ': ', answer);

      const question = this.questions[index];
      let answerValue = '';

      if (question.questionType === 1) { answerValue = answer.value; }
      else {
        // console.log(Object.entries(answer.value));

        answerValue = Object.entries(answer.value).reduce(
          (prev, crnt, index) => {
            if (crnt[1] === true)
              return prev === ''
                ? index.toString()
                : prev + ',' + index.toString();
            else return prev;
          },
          ''
        );
      }

      // Include the time taken for each question in the answer object
      const answerTime = this.timeTaken; // Add this line to get the time taken
      this.timeTaken = 0; // Reset the time taken for the next question

      return {
        // id: 0,//answerID
        attemptID: 0,
        questionID: question.id,
        skipped: false,
        answer: answerValue,
        answerTime: answerTime
      };
    });

    // console.log({ answers });

    this.testAttemptService
      .saveTestAttempt({
        // id: 0,//attemptID
        testID: this.assignment.testID,
        userID: this.assignment.assignedToID,
        testAssignmentID: this.testAssignmentID,
        attemptDate: attemptDate,
        answers: answers,
      })
      .then(() =>
        this.router.navigateByUrl('mytests').catch((error) => {
          console.log(error);
        })
      )
      .catch((ex) => console.log(ex));
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'src/app/manage-test/test.service';

import { TestAttemptService } from '../test-attempt.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/manage-user/user.service';
import { MatSort } from '@angular/material/sort';
import { TestAssignmentService } from 'src/app/manage-test-assignment/test-assignment.service';

@Component({
  selector: 'app-test-attempt-stats',
  templateUrl: './test-attempt-stats.component.html',
  styleUrls: ['./test-attempt-stats.component.css'],
})
export class TestAttemptStatsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private readonly testService: TestService,
    private readonly testAttemptService: TestAttemptService,
    private userService: UserService,
    private assignmentService: TestAssignmentService
  ) { }

  attempts: any;
  testDescription: string = '';
  attemptStats: any = [];
  userID: any = null;
  totalAttempts: number = 0;

  allAssignments: any = [];

  displayedColumns: string[] = ['userName', 'totalAssignments', 'totalAttempts', 'totalMCQAttempted'];

  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.filterByParams()
    if (!isNaN(id) && id > 0) {
      this.getTestDetails(id);
      this.getAllAttempts(id);
      this.getAssignments(id);


      this.userService.getAllUsers().then((users) => {
        this.dataSource = new MatTableDataSource<User>(users);
        this.dataSource.sort = this.sort;
      });
    }
  }

  async getAssignments(testID: number) {

    const assignments = await this.assignmentService.getAllAssignmentsForTest(testID);
    console.log({ assignments });
    this.allAssignments = assignments;

  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  getTestDetails(testID: number) {
    this.testService
      .getTest(testID)
      .then((test) => (this.testDescription = test.description))
      .catch((err) => console.log(err));
  }

  async getAllAttempts(testID: number) {
    await this.testAttemptService
      .getAllAttemptsForTest(testID)
      .then((attemptsDetail) => {
        console.log({ attemptsDetail });
        console.log(this.userID)
        if (this.userID) {
          this.attempts = attemptsDetail;
          this.attempts = this.attempts.filter((a: any) => a.userID == this.userID)
          console.log(this.attempts);
          this.totalAttempts = this.attempts.length;

        }
        else {
          this.attempts = attemptsDetail;

          this.totalAttempts = attemptsDetail.length;

        }
        let questionCorrectCount: any = [];

        this.attempts.forEach((attempt: any) => {
          attempt.result.forEach((result: any, i: number) => {
            // Creating associative array
            const index = 'Q' + (i + 1);
            questionCorrectCount[index] = questionCorrectCount[index]
              ? questionCorrectCount[index] + (result.isCorrect ? 1 : 0)
              : result.isCorrect
                ? 1
                : 0;
          });
        });

        for (let key in questionCorrectCount) {
          this.attemptStats.push(
            Math.round((questionCorrectCount[key] / this.totalAttempts) * 100)
          );
        }
      })
      .catch((err) => console.log(err));
  }

  async filterByParams() {
    const params = this.route.snapshot.queryParams;

    if (params['userID']) {
      // Retrieve the user name from the query parameters
      const userID = decodeURIComponent(params['userID']);
      // Call the filter method with the user name
      this.userID = userID;
    }
  }

  getTotalAssignments(userId: number) {
    const totalUserAssignment = this.allAssignments.filter((a: any) => a.assignedToID == userId)
    return totalUserAssignment.length
  }

  getTotalAttempted(userId: number) {
    const totalUserAttempts = this.attempts.filter((a: any) => a.userID == userId)
    return totalUserAttempts.length
  }

  getTotalMCQsAttempted(userId: number) {
    const userAttempts = this.attempts.filter((a: any) => a.userID == userId);
    let totalMCQ = 0;
    if (userAttempts) {
      userAttempts.forEach((attempt: any) => {

        totalMCQ += attempt.result.length;

      })
      return totalMCQ
    }
    else
      return totalMCQ;

  }
}
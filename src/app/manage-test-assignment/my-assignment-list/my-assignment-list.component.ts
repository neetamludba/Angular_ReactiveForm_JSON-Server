import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TestAssignmentService } from '../test-assignment.service';
import { TestAttemptService } from 'src/app/manage-test-attempt/test-attempt.service';
import { TestAssignment } from 'src/app/models/test-assignment.model';
import { AccountService } from 'src/app/account/account.service';
import { TestService } from 'src/app/manage-test/test.service';
import { TestAttempt } from 'src/app/models/attempt.model';

@Component({
  selector: 'app-my-assignment-list',
  templateUrl: './my-assignment-list.component.html',
  styleUrls: ['./my-assignment-list.component.css']
})

export class MyAssignmentListComponent implements AfterViewInit {

  constructor(
    private assignmentService: TestAssignmentService,
    private accountService: AccountService,
    private router: Router,
    private testService: TestService,
    private testAttemptService: TestAttemptService
  ) { }

  displayedColumns: string[] = ['testDescription', 'assignedDate', 'action'];

  dataSource = new MatTableDataSource<TestAssignment>([]);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  ngAfterViewInit() {
    let crntUser = this.accountService.userValue;
    // console.log(crntUser)
    if (crntUser) {
      if (!isNaN(crntUser.userObject.userID) && crntUser.userObject.userID > 0) {
        this.getMyAssignments(crntUser.userObject.userID);
      }
    }
  }

  async getMyAssignments(userID: number) {
    try {
      const assignments = await this.assignmentService.getAllAssignmentsForUser(userID);

      // Use Promise.all to wait for all test descriptions to be fetched
      await Promise.all(assignments.map(async (assignment) => {
        const test = await this.testService.getTest(assignment.testID);
        assignment.testDescription = test.description;
      }));

      for (const a of assignments) {
        const isAttempted = await this.testAttemptService.getTestAttemptForAssignment(a.id);

        if (!isAttempted || isAttempted.length === 0) {
          a.attempted = false;
        } else {
          a.attempted = true;
        }
      }

      // console.table(assignments);

      this.dataSource = new MatTableDataSource<TestAssignment>(assignments);
      this.dataSource.sort = this.sort;
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
    }
  }


  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  startNewAttempt(testAssignmentID: number) {
    this.router
      .navigateByUrl('testattempt/create/' + testAssignmentID)
      .catch((error) => {
        console.log(error);
      });
  }

  viewAttempt(testAssignmentID: number) {
    this.router
      .navigateByUrl('testattempt/view/' + testAssignmentID)
      .catch((error) => {
        console.log(error);
      });
  }
}

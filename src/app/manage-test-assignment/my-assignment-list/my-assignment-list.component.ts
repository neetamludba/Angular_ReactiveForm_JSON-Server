import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TestAssignmentService } from '../test-assignment.service';
import { TestAssignment } from 'src/app/models/test-assignment.model';
import { AccountService } from 'src/app/account/account.service';
import { TestService } from 'src/app/manage-test/test.service';

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
  ) { }

  displayedColumns: string[] = ['testDescription', 'assignedDate', 'action'];

  dataSource = new MatTableDataSource<TestAssignment>([]);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  ngAfterViewInit() {
    let crntUser = this.accountService.userValue;
    console.log(crntUser)
    if (crntUser) {
      if (!isNaN(crntUser.userObject.userID) && crntUser.userObject.userID > 0) {
        this.getMyAssignments(crntUser.userObject.userID);
      }
    }
  }

  getMyAssignments(userID: number) {
    this.assignmentService
      .getAllAssignmentsForUser(userID)
      .then((assignments) => {
        assignments.forEach(assignment => {
          this.testService.getTest(assignment.testID)
            .then((test) => {
              assignment.testDescription = test.description;
            })
        });
        console.log(assignments)
        this.dataSource = new MatTableDataSource<TestAssignment>(assignments);
        this.dataSource.sort = this.sort;
      });
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

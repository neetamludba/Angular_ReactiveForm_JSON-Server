import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TestAssignmentService } from '../test-assignment.service';
import { TestAssignment } from 'src/app/models/test-assignment.model';
import { TestAssignmentDetailComponent } from '../test-assignment-detail/test-assignment-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-test-assignment-list',
  templateUrl: './test-assignment-list.component.html',
  styleUrls: ['./test-assignment-list.component.css']
})
export class TestAssignmentListComponent implements OnInit {
  constructor(
    private assignmentService: TestAssignmentService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  testID: number = 0;

  testName: string = '';
  displayedColumns: string[] = ['assignedToName', 'totalAssignments', 'assignedByName', 'assignedDate'];
  userObject: any = {};
  assignments: any = {};
  dataSource = new MatTableDataSource<TestAssignment>([]);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  async ngOnInit() {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    const userString = localStorage.getItem('user');
    this.userObject = JSON.parse(userString!);
    console.log(this.userObject)
    if (!isNaN(id) && id > 0) {
      this.testID = id;
      await this.getAssignments(this.testID);
      await this.getTest(this.testID);
    }
  }

  getTotalAssignments(userId: number) {

    let filterAssignments = this.assignments.filter((object: { assignedToID: number }) => {
      return object.assignedToID == userId
    });
    const result = filterAssignments.length;
    console.log(result);

    return result;
  }

  async getTest(testID: number) {
    try {
      const test = await this.assignmentService.getTest(testID);
      console.log({ test });
      if (test)
        this.testName = test.description;

      // After getting test data, apply the filter if necessary
      await this.filterByParams();
    } catch (error) {
      // Handle errors here
    }
  }

  async getAssignments(testID: number) {

    // const assignments = await this.assignmentService.getAllAssignmentsForTest(testID);
    // console.log({ assignments });

    // this.dataSource = new MatTableDataSource<TestAssignment>(assignments);
    // this.dataSource.sort = this.sort;
    const assignments = await this.assignmentService.getAllAssignmentsForTest(testID);
    this.assignments = assignments;
    // Create a Map to store unique assignments based on assignedToID
    const uniqueAssignmentsMap = new Map();

    assignments.forEach(assignment => {
      const assignedToID = assignment.assignedToID;

      // Check if the assignment with the same assignedToID already exists in the map and set the newer value 
      if (!uniqueAssignmentsMap.has(assignedToID) ||
        new Date(assignment.assignedDate) > new Date(uniqueAssignmentsMap.get(assignedToID).assignedDate)) {
        uniqueAssignmentsMap.set(assignedToID, assignment);
      }
    });

    // Convert the Map values back to an array to get unique assignments
    const uniqueAssignments = Array.from(uniqueAssignmentsMap.values());

    this.dataSource = new MatTableDataSource<TestAssignment>(uniqueAssignments);
    this.dataSource.sort = this.sort;

    // After loading assignments data, apply the filter if necessary
    await this.filterByParams();

  }

  async filterByParams() {
    const params = this.route.snapshot.queryParams;

    if (params['user']) {
      // Retrieve the user name from the query parameters
      const userName = decodeURIComponent(params['user']);
      // Call the filter method with the user name
      console.log(userName);
      this.doFilter(userName);
    }
  }

  public doFilter(value: string) {
    if (this.dataSource) {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
  }

  assignTest() {
    let assignment: any = { testID: this.testID };

    const dialogRef = this.dialog.open(TestAssignmentDetailComponent, {
      data: assignment,
      width: '600px',
    });



    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // console.log({ result });

        console.log(this.userObject.userID,
          this.userObject.firstName + ' ' + this.userObject.lastName)
        this.assignmentService
          .addAssignment({
            ...result,
            assignedByID: this.userObject.userObject.userID,
            assignedByName: this.userObject.userObject.firstName + ' ' + this.userObject.userObject.lastName
          })
          .then(() => this.getAssignments(this.testID))
          .catch((err) => console.log(err));
      }
    });
  }
}

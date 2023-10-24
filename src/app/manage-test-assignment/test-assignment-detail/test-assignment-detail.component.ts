import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/manage-user/user.service';
import { BatchService } from 'src/app/manage-batch/batch.service';
import { TestAssignment } from 'src/app/models/test-assignment.model';
import { User } from 'src/app/models/user.model';
import { Batch } from 'src/app/models/batch.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-test-assignment-detail',
  templateUrl: './test-assignment-detail.component.html',
  styleUrls: ['./test-assignment-detail.component.css']
})

export class TestAssignmentDetailComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TestAssignmentDetailComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private batchService: BatchService,
  ) { }

  assignmentDetailsForm = this.formBuilder.group({
    assignedTo: new FormControl('', [Validators.required]),
  });

  users: User[] = [];

  errorMessage: string = '';
  
  currentDate = new Date; 
  assignedDate = formatDate(this.currentDate, 'yyyy-MM-dd hh:mm a', 'en-US'); 

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService
      .getAllActiveUsers()
      .then((users) => {
        this.users = users.slice();
      })
      .catch((err) => console.log(err));
  }

  changeUser(e: any) {
    this.assignmentDetailsForm.setValue({ assignedTo: e.target.value });
  }

  addAssignment() {
    this.dialogRef.close({
      ...this.data,
      assignedToID: this.assignmentDetailsForm.get('assignedTo')?.value,
      assignedDate: this.assignedDate
    });
  }
}

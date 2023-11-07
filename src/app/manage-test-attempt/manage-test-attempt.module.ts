import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestAttemptDetailsComponent } from './test-attempt-details/test-attempt-details.component';
import { TestAttemptListComponent } from './test-attempt-list/test-attempt-list.component';
import { TestAttemptStatsComponent } from './test-attempt-stats/test-attempt-stats.component';
import { ViewTestAttemptComponent } from './view-test-attempt/view-test-attempt.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    TestAttemptDetailsComponent,
    TestAttemptListComponent,
    TestAttemptStatsComponent,
    ViewTestAttemptComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatRadioModule,
  ]
})
export class ManageTestAttemptModule { }

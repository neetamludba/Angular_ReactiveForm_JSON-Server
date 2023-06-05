import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestListComponent } from './test-list/test-list.component';
import { TestDetailsComponent } from './test-details/test-details.component';
import { TestListDeletedComponent } from './test-list-deleted/test-list-deleted.component';

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


@NgModule({
  declarations: [
    TestListComponent,
    TestDetailsComponent,
    TestListDeletedComponent
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
  ]
})
export class ManageTestModule { }

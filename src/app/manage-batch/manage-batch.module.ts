import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchListComponent } from './batch-list/batch-list.component';
import { BatchDetailsComponent } from './batch-details/batch-details.component';

import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BatchListDeletedComponent } from './batch-list-deleted/batch-list-deleted.component';


@NgModule({
  declarations: [
    BatchListComponent,
    BatchDetailsComponent,
    BatchListDeletedComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ]
})
export class ManageBatchModule { }

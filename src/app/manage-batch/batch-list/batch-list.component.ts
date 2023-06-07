import { Component, ViewChild, AfterViewInit } from '@angular/core';
// We are importing MatTableDataSource and MatSort from the @angular/material module, 
// which is a UI component library for Angular. 
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// We also import Router from the @angular/router module to allow us to navigate to other components. 
import { Router } from '@angular/router';

// Finally, we import our own batch model and BatchService from our application.
import { Batch } from 'src/app/models/batch.model';
import { BatchService } from '../batch.service';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.css']
})
export class BatchListComponent {

  constructor(
    private router: Router,
    private batchService: BatchService
  ) { }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  displayedColumns: string[] = ['batchName', 'startDate', 'active', 'createdDate', 'actions']
  dataSource = new MatTableDataSource<Batch>([]);

  ngAfterViewInit() {
    this.getAllBatches();
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  getAllBatches() {
    this.batchService.getAllBatches()
      .then((batches) => {
        console.log(batches);
        let filteredCategories = batches.filter((object: { isDeleted: boolean }) => {
          return object.isDeleted == false
        });
        this.dataSource = new MatTableDataSource<Batch>(filteredCategories);
        this.dataSource.sort = this.sort;
      })
      .catch((error) => console.log(error))

  }

  createBatch() {
    this.router.navigateByUrl('batch/create').catch((error) => {
      console.log(error);
    });
  }

  editBatch(batchId: number) {
    this.router.navigateByUrl('batch/' + batchId).catch((error) => {
      console.log(error);
    });

  }

  deleteBatch(batchId: any) {
    this.batchService.deleteBatch(batchId)
      .catch((ex) => console.log(ex));

    this.getAllBatches();
  }

  gotoDeletedBatches() {
    this.router.navigateByUrl('batch/deleted').catch((error) => {
      console.log(error);
    });
  }

}

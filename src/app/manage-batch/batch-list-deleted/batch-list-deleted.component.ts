import { Component,AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { BatchService } from '../batch.service';
import { Batch } from 'src/app/models/batch.model';




@Component({
  selector: 'app-batch-list-deleted',
  templateUrl: './batch-list-deleted.component.html',
  styleUrls: ['./batch-list-deleted.component.css']
})
export class BatchListDeletedComponent implements AfterViewInit {
  constructor(
    public router: Router,
    private batchService: BatchService
  ) { } 

// We use ViewChild decorator to access the MatSort instance and assign it to the sort property of the component.
@ViewChild(MatSort)
sort: MatSort = new MatSort();

// The displayedColumns property is used to define the columns that will be displayed in the table.
displayedColumns: string[] = ['batchName', 'startDate','active', 'createdDate', 'actions']
dataSource = new MatTableDataSource<Batch>([]);


ngAfterViewInit() {
  this.getAllDeletedBatches();
}

// The doFilter method is used to filter the data source when the user types in the filter input field.
doFilter(value: string) {
  this.dataSource.filter = value.trim().toLocaleLowerCase();
}


getAllDeletedBatches() {
  this.batchService.getAllBatches()
    .then((batches) => {
      let filteredBatches = batches.filter((object: { isDeleted: boolean }) => {
        return object.isDeleted == true
      });
      this.dataSource = new MatTableDataSource<Batch>(filteredBatches);
      this.dataSource.sort = this.sort;
    })
    .catch((error) => console.log(error))

}




// This function takes in a categoryId number and deletes the corresponding category
unDeleteBatch(batchId: any) {
  // Calls the deleteCategory method from the testCategoryService with an object containing the categoryId and a flag isDeleted set to true.
  this.batchService.unDeleteBatch(batchId)
  .catch((ex)=> console.log(ex));
  this.getAllDeletedBatches();

}

backToBatch(){
  this.router.navigateByUrl('batch').catch((error) =>
  console.log(error));
}


}

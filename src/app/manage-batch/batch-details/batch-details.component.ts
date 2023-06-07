import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchService } from '../batch.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.css']
})
export class BatchDetailsComponent {
 
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private batchService: BatchService
  ) { } 
  ngOnInit(): void { 

    let id = Number(this.route.snapshot.paramMap.get('id'));  
    
    if (id > 0 && !isNaN(id)) { 
      this.batchId = id; 
      this.getbatch(this.batchId); 

    }
  }

  batchDetailsForm = new FormGroup({ 
    batchName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    startDate: new FormControl('', [
      Validators.required,
    ]),
    active: new FormControl(true),
  })

  batchId: number = 0; 
  currentDate = new Date; 
  batchDate = formatDate(this.currentDate, 'yyyy-MM-dd hh:mm a', 'en-US'); 

  showErrorMessage(fieldName: string) { 
    let errors = this.batchDetailsForm.get(fieldName)?.errors; 

    if (errors) { // Checking if there are validation errors

      if (errors['required']) return 'Category name is required'; // Returning an error message for the 'required' validator
      if (errors['minlength']) return 'Category name must be 5 characters long'; // Returning an error message for the 'minlength' validator
      return '';
    } else return '';
  }


  
  getbatch(batchId: number) {
    this.batchService.getbatch(batchId)
      .then((batch) => {
        
        console.table(batch);

        this.batchDetailsForm.setValue({
          batchName: batch.batchName,
          startDate: batch.startDate,
          active: batch.active
        }
        )
      })
  }

  saveForm() {
    // Call the testCategoryService's saveCategory method with the form data
    this.batchService.saveBatch({
      id: this.batchId,
      batchName: this.batchDetailsForm.get('batchName')?.value,
      startDate: this.batchDetailsForm.get('startDate')?.value,
      active: this.batchDetailsForm.get('active')?.value,
      createdDate: this.batchDate,
      isDeleted: false
    })
      .then(() =>
        // Navigate to the testCategory page if the save is successful
        this.router.navigateByUrl('batch')
          .catch((error) =>
            console.log(error))
      )
      .catch((err) => console.log(err))
  }

  // This function resets the form
  resetForm() {
    // Log a message to the console
    console.log('Reset Button Works ');

    // Reset the batchDetailsForm
    this.batchDetailsForm.reset();

    // Log a message to the console
    console.log('Form reset Sussesfully');
  }

  // This function cancels the form
  cancelForm() {
    // Navigate to the batch page
    this.router.navigateByUrl('batch').catch((error) =>
      console.log(error));
  }

}

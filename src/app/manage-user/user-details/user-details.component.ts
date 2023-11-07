import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements AfterViewInit {
  allBatches: any;
  roles: any = ['Admin', 'Teacher', 'Student'];
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  userDetailsForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    role: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    batchId: new FormControl(0, [Validators.required]),
    active: new FormControl(true),
  });

  userId: number = 0;
  currentDate = new Date; // A property that holds the current date
  registrationDate = formatDate(this.currentDate, 'yyyy-MM-dd hh:mm a', 'en-US'); // A property that holds the formatted current date using the formatDate function

  async ngAfterViewInit(): Promise<void> {
    let id = Number(this.route.snapshot.paramMap.get('id'));

    await this.getBatches();
    if (!isNaN(id) && id > 0) {
      this.userId = id;
      this.getUser(this.userId);
    }
  }

  showErrorMessage(fieldName: string) {
    let errors = this.userDetailsForm.get(fieldName)?.errors;

    if (errors) {
      //console.log({ fieldName }, { errors }, errors['required']);

      if (errors['required']) return fieldName + ' is required';
      if (errors['minlength']) return fieldName + ' must be 5 characters long';
      return '';
    } else return '';
  }

  getUser(userId: number) {
    this.userService.getUser(userId).then((user) => {
      this.userDetailsForm.setValue({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        role: user.role,
        active: user.active,
        batchId: Number(user.batchId)
      });

      this.userDetailsForm.controls['email'].disable();
    });
  }

  getBatches() {
    this.userService
      .getAllBatches()
      .then((batches) => 
        this.allBatches = batches
      )
      .catch((err) => console.log(err));
  }
  changeBatch(e: any) {
    this.userDetailsForm.setValue(
      {
        batchId: e.target.value.toString(),
        email: null,
        password: null,
        role: null,
        firstName: null,
        lastName: null,
        active: null
      }
    );
  }



  saveUser() {
    // console.log(this.userDetailsForm.errors);

    this.userService
      .saveUser(
        {
          id: this.userId,
          email: this.userDetailsForm.get('email')?.value,
          password: this.userDetailsForm.get('password')?.value,
          firstName: this.userDetailsForm.get('firstName')?.value,
          lastName: this.userDetailsForm.get('lastName')?.value,
          batchId: this.userDetailsForm.get('batchId')?.value?.toString(),
          role: this.userDetailsForm.get('role')?.value,
          registrationDate: this.registrationDate,
          active: Boolean(this.userDetailsForm.get('active')?.value),
          isDeleted: false,
        }
      )
      .then((userCreated) => {
        if (userCreated)
          this.router.navigateByUrl('user').catch((error) => {
            console.log(error);
          });
      })
      .catch((ex) => console.log(ex));
  }

  closeForm() {
    this.router.navigateByUrl('user')
  }

}

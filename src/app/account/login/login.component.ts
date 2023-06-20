import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) { }

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  loading = false;
  submitted = false;

  ngOnInit() { }

  // // convenience getter for easy access to form fields
  // get f() {
  //   return this.loginForm.controls;
  // }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    var username = this.loginForm.get('username')?.value;
    var password = this.loginForm.get('password')?.value;
    if (username && password) {
      this.accountService
        .login(username, password
        )
        .then((accountData) => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        })
        .catch((err) => {
          this.submitted = false;
          this.loading = false;
        });
    }
  }
}

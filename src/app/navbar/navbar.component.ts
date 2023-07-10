import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public currentPageTitle: string = '';
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        var rt = this.getChild(this.activatedRoute);

        rt.data.subscribe((data) => {
          this.currentPageTitle = data['title'] ?? 'Page Title';
        });
      });
      this.getUserName();
      
  }
  userName: string = '';

  getUserName() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userObject = JSON.parse(userString);
      if (Array.isArray(userObject) && userObject.length > 0) {
        this.userName = userObject[0].firstName + ' ' + userObject[0].lastName;
      } else {
        // Handle case where userObject is not an array or is empty
        // Display an appropriate error or fallback value
      }
    } else {
      // Handle case where userString is null or undefined
      // Display an appropriate error or fallback value
    }
  }
  

  

  getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  getTitle() {
    return this.currentPageTitle;
  }
  resetPassword() {
    this.router.navigateByUrl('/account/reset-password');
  }

  logout() {
    this.accountService.logout();
  }
}

import { Component, HostListener } from '@angular/core';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practice-webapp-json';
  user: any;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }
  isSmallScreen: boolean = false;
  isExpanded: boolean = true;

  toggleSidebar() {
    if (this.isSmallScreen) {
      this.isExpanded = !this.isExpanded;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isSmallScreen = window.innerWidth <= 768; // Adjust the breakpoint as needed
    if (this.isSmallScreen && !this.isExpanded) {
      this.isExpanded = true; // Expand the sidebar on small screens when the screen size changes
    }
  }
}

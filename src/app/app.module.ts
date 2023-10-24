import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ManageTestCategoryModule } from './manage-test-category/manage-test-category.module';
import { ManageTestModule } from './manage-test/manage-test.module';
import { ManageQuestionModule } from './manage-question/manage-question.module';
import { ManageBatchModule } from './manage-batch/manage-batch.module';
import { ManageUserModule } from './manage-user/manage-user.module';
import { AccountModule } from './account/account.module';
import { ManageTestAssignmentModule } from './manage-test-assignment/manage-test-assignment.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from './navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';




@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ManageTestCategoryModule,
    ManageTestModule,
    ManageQuestionModule,
    ManageBatchModule,
    ManageUserModule,
    MatListModule,
    AccountModule,
    ManageTestAssignmentModule,
    
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

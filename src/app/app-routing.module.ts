// Importing necessary Angular modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importing the components used in the routing module
import { CategoryDetailsComponent } from './manage-test-category/category-details/category-details.component';
import { CategoryListComponent } from './manage-test-category/category-list/category-list.component';
import { CategoryListDeletedComponent } from './manage-test-category/category-list-deleted/category-list-deleted.component';
import { TestListComponent } from './manage-test/test-list/test-list.component';
import { TestDetailsComponent } from './manage-test/test-details/test-details.component';
import { TestListDeletedComponent } from './manage-test/test-list-deleted/test-list-deleted.component';
import { BatchDetailsComponent } from './manage-batch/batch-details/batch-details.component';
import { BatchListComponent } from './manage-batch/batch-list/batch-list.component';
import { BatchListDeletedComponent } from './manage-batch/batch-list-deleted/batch-list-deleted.component';
import { UserDetailsComponent } from './manage-user/user-details/user-details.component';
import { UserListComponent } from './manage-user/user-list/user-list.component';
import { UserListDeletedComponent } from './manage-user/user-list-deleted/user-list-deleted.component';
import { LoginComponent } from './account/login/login.component';

import { AuthGuard } from './helpers/auth.guard';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { TestAssignmentListComponent } from './manage-test-assignment/test-assignment-list/test-assignment-list.component';
import { MyAssignmentListComponent } from './manage-test-assignment/my-assignment-list/my-assignment-list.component';
import { TestAttemptDetailsComponent } from './manage-test-attempt/test-attempt-details/test-attempt-details.component';
import { ViewTestAttemptComponent } from './manage-test-attempt/view-test-attempt/view-test-attempt.component';
import { TestAttemptStatsComponent } from './manage-test-attempt/test-attempt-stats/test-attempt-stats.component';
// Creating an array of routes for the application
const routes: Routes = [
  {
    path: '',
    component: TestListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Test List' }
  },
  {
    path: 'account/login',
    component: LoginComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    // pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Reset Password' }
  },
  {
    path: 'failed-reset-password',
    component: ResetPasswordComponent,
    // pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Reset Password Failed' }
  },
  {
    path: 'home',
    component: CategoryListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Test Category List' }

  },
  {
    path: 'testCategory',
    component: CategoryListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Test Category List' }

  },
  {
    path: 'testCategory/create',
    component: CategoryDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Create Test Category' }

  },
  {
    path: 'testCategory/deleted',
    component: CategoryListDeletedComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Deleted Test Category List' }
  },
  {
    path: 'testCategory/:id',
    component: CategoryDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Edit Test Category' }
  },

  {
    path: 'test',
    component: TestListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Test List' }
  },
  {
    path: 'test/create',
    component: TestDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Create Test' }
  },
  {
    path: 'test/deleted',
    component: TestListDeletedComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Deleted Test List' }
  },
  {
    path: 'test/:id',
    component: TestDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Edit Test' }
  },
  {
    path: 'testassignment/:id',
    component: TestAssignmentListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'Test Assignment List',
    },
  },
  {
    path: 'mytests',
    component: MyAssignmentListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_USER',
      title: 'My Tests',
    },
  },
  {
    path: 'testattempt/create/:id',
    component: TestAttemptDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'Test Attempt Details',
    },
  },
  {
    path: 'testattempt/view/:id',
    component: ViewTestAttemptComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'Test Attempt Details',
    },
  },
  {
    path: 'testattemptstats/:id',
    component: TestAttemptStatsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'Test Attempt Statistics',
    },
  },
  {
    path: 'batch',
    component: BatchListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Batch List' }
  },
  {
    path: 'batch/create',
    component: BatchDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Create Batch' }
  },
  {
    path: 'batch/deleted',
    component: BatchListDeletedComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Deleted Batch List' }
  },
  {
    path: 'batch/:id',
    component: BatchDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Edit Batch' }
  },
  {
    path: 'user',
    component: UserListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'User List' }
  },
  {
    path: 'user/create',
    component: UserDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Create User' }
  },
  {
    path: 'user/deleted',
    component: UserListDeletedComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Deleted User List' }
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Edit User' }
  }


  




 
];

// Configuring and exporting the Angular routing module
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// In the above code snippet, we can see a typical routing module for an Angular application.
// Here, we import the necessary Angular modules 'NgModule' and 'RouterModule' from the '@angular/core' and '@angular/router' packages, respectively.
// Then, we import the components that will be used for routing in our application: 'CategoryDetailsComponent' and 'CategoryListComponent'.
// Next, we define an array of routes that map URLs to component views.
// The 'path' property specifies the URL path and the 'component' property specifies the corresponding component.
// The 'pathMatch' property is set to 'full' to ensure that the full URL is matched.
// Finally, we configure and export our routing module using the 'NgModule' decorator.
// The 'imports' array specifies the routes to use, and the 'exports' array exports the configured 'RouterModule' for use in other modules of the application.
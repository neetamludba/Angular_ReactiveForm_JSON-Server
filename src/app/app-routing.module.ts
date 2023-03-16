// Importing necessary Angular modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importing the components used in the routing module
import { CategoryDetailsComponent } from './manage-test-category/category-details/category-details.component';
import { CategoryListComponent } from './manage-test-category/category-list/category-list.component';

// Creating an array of routes for the application
const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: CategoryListComponent,
    pathMatch: 'full'
  },
  {
    path: 'testCategory',
    component: CategoryListComponent,
    pathMatch: 'full'
  },
  {
    path: 'testCategory/create',
    component: CategoryDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'testCategory/:id',
    component: CategoryDetailsComponent,
    pathMatch: 'full'
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
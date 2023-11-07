// The import statements at the top bring in the necessary Angular modules
// to perform HTTP requests and to provide the Injectable decorator.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// @Injectable({ providedIn: 'root' }) is an Angular decorator that tells Angular to inject this service into the root component injector, so that it is available to all components in the application.
@Injectable({
  providedIn: 'root'
})
export class TestCategoryService {
  
  // The constructor method injects the HttpClient service into this service using Dependency Injection.
  constructor(
    private http: HttpClient
  ) { }

  // private jsonServerURL = 'http://localhost:4000/test-category'; is the URL of the JSON server that this service will interact with. The server is running on localhost and is serving the /test-category endpoint.
  // The URL of the JSON server
  private jsonServerURL = 'http://localhost:4000/test-category';

  // headers and options are properties that define the headers to be used in HTTP requests, and the options to be used with those headers.
  // The headers for the HTTP requests
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // The options for the HTTP requests
  options = { headers: this.headers };


  // saveCategory, getCategory, getAllCategories, and deleteCategory are methods that interact with the JSON server to perform CRUD operations on test categories. 
  // Each of these methods returns a Promise that resolves with the data returned by the server or rejects with an error.


  // This function saves the category data
  // saveCategory(category: any): Promise<any>: This method saves the category data to the server. 
  // It takes a category object as a parameter and returns a Promise that resolves with the saved data or rejects with an error. 
  // If the id of the category is 0, it means that it is a new category and the id field is removed from the category object to allow the JSON server to auto-increment it. 
  // If the id is greater than 0, 
  // it means that the category already exists and the category object is sent to the server for an update.
  async saveCategory(category: any): Promise<any> {

    console.table(category);
    if (category.id === 0) {
      // If id is 0, add a new category
      delete category.id; // Remove the id field to allow JSON server to auto-increment it
      return this.http.post(this.jsonServerURL, category, this.options).toPromise();
    } else {
      // If id is greater than 0, update an existing category
      const url = `${this.jsonServerURL}/${category.id}`;
      return this.http.put(url, category).toPromise()
    }
  }

  // This function gets the category data
  // getCategory(categoryId: number): Promise<any>: This method gets the category data from the server for a specific categoryId. 
  // It takes the categoryId as a parameter and returns a Promise that resolves with the category data or rejects with an error.
  async getCategory(categoryId: number): Promise<any> {
    return this.http.get(this.jsonServerURL + '/' + categoryId)
      .toPromise().then((testCategoryData) => testCategoryData)
  }


  // This function gets all the categories
  // getAllCategories(): Promise<any>: This method gets all the categories from the server. 
  // It returns a Promise that resolves with the categories data or rejects with an error.
  async getAllCategories(): Promise<any> {
    return this.http.get(this.jsonServerURL)
      .toPromise().then((testCategoryData) => testCategoryData)
  }

  // This function deletes the category data
  // deleteCategory(categoryId: number): Promise<any>: This method deletes the category data from the server for a specific categoryId. 
  // It takes the categoryId as a parameter and returns a Promise that resolves with the deleted data or rejects with an error. If the categoryId is not defined, it rejects with an error.
  async deleteCategory(categoryId: number): Promise<any> {
    if (!categoryId) {
      return Promise.reject(new Error('Category ID is undefined'));
    }
    const url = `${this.jsonServerURL}/${categoryId}`;
    return this.http.patch(url, { isDeleted: true }, this.options)
      .toPromise()
      
  }

  async unDeleteCategory(categoryId: number): Promise<any> {
    const url = `${this.jsonServerURL}/${categoryId}`;
    return this.http.patch(url, { isDeleted: false }, this.options)
      .toPromise()
  }


}
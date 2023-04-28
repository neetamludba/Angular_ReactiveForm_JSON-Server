import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(
    private http: HttpClient
  ) { }

    // private jsonServerURL = 'http://localhost:3000/test'; is the URL of the JSON server that this service will interact with. The server is running on localhost and is serving the /test endpoint.
  // The URL of the JSON server
  private jsonServerURLTest = 'http://localhost:3000/test';

  private jsonServerURLTestCategory = 'http://localhost:3000/test-category';

  // headers and options are properties that define the headers to be used in HTTP requests, and the options to be used with those headers.
  // The headers for the HTTP requests
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // The options for the HTTP requests
  options = { headers: this.headers };

  async getAllCategories(): Promise<any> {
    return this.http.get(this.jsonServerURLTestCategory)
      .toPromise().then((testCategoryData) => testCategoryData)
      .catch((ex) => console.log(ex));
  }

  async getTest(testId: number):Promise<any> {
    const url = `${this.jsonServerURLTest}/${testId}`;
    return this.http.get(url)
    .toPromise().then((testData) => testData)
    .catch((ex) => console.log(ex));  }

  async getAllTest(): Promise<any> {
    return this.http.get(this.jsonServerURLTest)
      .toPromise().then((testData) => testData)
      .catch((ex) => console.log(ex));
  }

  async saveTest(test: any): Promise<any> {

    console.table(test);
    if (test.id === 0) {
      delete test.id; // Remove the id field to allow JSON server to auto-increment it
      return this.http.post(this.jsonServerURLTest, test, this.options).toPromise();
    } else {
      // If id is greater than 0, update an existing category
      const url = `${this.jsonServerURLTest}/${test.id}`;
      return this.http.put(url, test).toPromise()
        .catch((ex) => console.log(ex));
    }
  }
  
  async deleteTest(testId: number):Promise<any> {
      if (!testId) {
        return Promise.reject(new Error('Test ID is undefined'));
      }
      const url = `${this.jsonServerURLTest}/${testId}`;
      return this.http.patch(url, { isDeleted: true }, this.options)
        .toPromise()
        .catch((ex) => console.log(ex)); 
  }

  async unDeleteTest(testId: number): Promise<any> {
    const url = `${this.jsonServerURLTest}/${testId}`;
    return this.http.patch(url, { isDeleted: false }, this.options)
    .toPromise()
    .catch((ex) => console.log(ex));
  }

}

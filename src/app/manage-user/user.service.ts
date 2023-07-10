import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  // private jsonServerURL = 'http://localhost:3000/user'; is the URL of the JSON server that this service will interact with. The server is running on localhost and is serving the /test-user endpoint.
  // The URL of the JSON server
  private jsonServerURLUser = 'http://localhost:3000/user';
  private jsonServerURLbatch = 'http://localhost:3000/batch';
  // headers and options are properties that define the headers to be used in HTTP requests, and the options to be used with those headers.
  // The headers for the HTTP requests
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // The options for the HTTP requests
  options = { headers: this.headers };


  // saveuser, getuser, getAllusers, and deleteuser are methods that interact with the JSON server to perform CRUD operations on test users. 
  // Each of these methods returns a Promise that resolves with the data returned by the server or rejects with an error.

  async saveUser(user: any): Promise<any> {

    console.table(user);
    if (user.id === 0) {
      // If id is 0, add a new user
      delete user.id; // Remove the id field to allow JSON server to auto-increment it
      return this.http.post(this.jsonServerURLUser, user, this.options).toPromise();
    } else {
      // If id is greater than 0, update an existing user
      const url = `${this.jsonServerURLUser}/${user.id}`;
      return this.http.put(url, user).toPromise()
        .catch((ex) => console.log(ex));
    }
  }

  // This function gets the user data
  // getuser(userId: number): Promise<any>: This method gets the user data from the server for a specific userId. 
  // It takes the userId as a parameter and returns a Promise that resolves with the user data or rejects with an error.
  async getUser(userId: number): Promise<any> {
    return this.http.get(this.jsonServerURLUser + '/' + userId)
      .toPromise().then((userData) => userData)
      .catch((ex) => console.log(ex));
  }

  async getAllBatches(): Promise<any> {
    
    return this.http.get(this.jsonServerURLbatch)
    .toPromise().then((batchData) => batchData)
    
    .catch((ex) => console.log(ex));
  }
  


  // This function gets all the users
  // getAllusers(): Promise<any>: This method gets all the users from the server. 
  // It returns a Promise that resolves with the users data or rejects with an error.
  async getAllUsers(): Promise<any> {
    return this.http.get(this.jsonServerURLUser)
      .toPromise().then((userData) => userData)
      .catch((ex) => console.log(ex));
  }

  async deleteUser(userId: number): Promise<any> {
    if (!userId) {
      return Promise.reject(new Error('user ID is undefined'));
    }
    const url = `${this.jsonServerURLUser}/${userId}`;
    return this.http.patch(url, { isDeleted: true }, this.options)
      .toPromise()
      .catch((ex) => console.log(ex));
  }

  async unDeleteUser(userId: number): Promise<any> {
    const url = `${this.jsonServerURLUser}/${userId}`;
    return this.http.patch(url, { isDeleted: false }, this.options)
      .toPromise()
      .catch((ex) => console.log(ex));
  }


}

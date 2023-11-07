import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Test } from '../models/test.model';
import { TestAssignment } from '../models/test-assignment.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TestAssignmentService {

  // The constructor method injects the HttpClient service into this service using Dependency Injection.
  constructor(
    private http: HttpClient
  ) { }

  // private jsonServerURL = 'http://localhost:4000/test-category'; is the URL of the JSON server that this service will interact with. The server is running on localhost and is serving the /test-category endpoint.
  // The URL of the JSON server
  private jsonServerURLAssignment = 'http://localhost:4000/test-assignment';
  private jsonServerURLTest = 'http://localhost:4000/test';
  private jsonServerURLUser = 'http://localhost:4000/user';


  // headers and options are properties that define the headers to be used in HTTP requests, and the options to be used with those headers.
  // The headers for the HTTP requests
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // The options for the HTTP requests
  options = { headers: this.headers };


  async getAssignment(assignmentID: number): Promise<TestAssignment | null> {
    try {
      const response = await this.http.get(this.jsonServerURLAssignment +'/'+ assignmentID)
        .toPromise();
      const assignment: TestAssignment = response as TestAssignment;
      return assignment
    } catch (error) { 
      console.log(error)
      return null
    }
  }

  async getTest(testID: number): Promise<Test | null> {
    try {
      const response = await this.http.get(this.jsonServerURLTest + '/' + testID).toPromise();
      const test: Test = response as Test; // Assuming the response is of type Test
      return test;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAllAssignmentsForTest(testID: number): Promise<TestAssignment[]> {
    try {
      const response = await this.http.get(this.jsonServerURLAssignment + '/?testID=' + testID).toPromise();
      const assignments: TestAssignment[] = response as TestAssignment[];
      return assignments;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  private async getUser(userId: number): Promise<User | null> {
    try {
      const response = await this.http.get(this.jsonServerURLUser + '/' + userId).toPromise();
      const user: User = response as User; // Assuming the response is of type user
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async addAssignment(assignment: any) {
    const user = await this.getUser(assignment.assignedToID);
    if (user) {
      assignment.assignedToName = user.firstName + ' ' + user.lastName
    }
    return this.http.post(this.jsonServerURLAssignment, assignment)
      .toPromise().then((count) => count)
      .catch((ex) => console.log(ex));
  }

  async getAllAssignmentsForUser(userID: number): Promise<TestAssignment[]> {
    try {
      const response = await this.http.get(this.jsonServerURLAssignment + '/?assignedToID=' + userID).toPromise();
      const assignments: TestAssignment[] = response as TestAssignment[];
      return assignments;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

}

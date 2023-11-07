import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestAttempt } from '../models/attempt.model';

@Injectable({
  providedIn: 'root',
})
export class TestAttemptService {
  // The constructor method injects the HttpClient service into this service using Dependency Injection.
  constructor(
    private http: HttpClient
  ) { }

  // private jsonServerURL = 'http://localhost:4000/test-category'; is the URL of the JSON server that this service will interact with. The server is running on localhost and is serving the /test-category endpoint.
  // The URL of the JSON server
  private jsonServerURLAttempt = 'http://localhost:4000/test-attempt';
  private jsonServerURLTestQuestion = 'http://localhost:4000/test-question';
  private jsonServerURLTest = 'http://localhost:4000/test';
  private jsonServerURLAnswer = 'http://localhost:4000/test-answer';



  // headers and options are properties that define the headers to be used in HTTP requests, and the options to be used with those headers.
  // The headers for the HTTP requests
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // The options for the HTTP requests
  options = { headers: this.headers };

  async getTestAttemptForAssignmentWithAnswers(assignmentId: number): Promise<any> {
    try {
      const url = `${this.jsonServerURLAttempt}/?attemptID=${assignmentId}`;
      const attemptRes: any = await this.http.get(url).toPromise();

      if (attemptRes) {
        const testAnswers = await this.getAnswers(attemptRes.attemptID);
        // Create a new object with 'questions' property and merge the existing properties
        const testResWithQuestions = {
          ...attemptRes,
          answers: testAnswers
        };

        return testResWithQuestions;
      } else {
        throw new Error('Test not found'); // Handle the case when the test is not found
      }
    } catch (error) {
      console.error('An error occurred while fetching the test:', error);
      throw error; // You can re-throw the error or handle it as needed
    }
  }


  private getAnswers(attemptId: number): Promise<any> {
    const url = `${this.jsonServerURLAnswer}/?attemptID=${attemptId}`;
    return this.http.get(url)
      .toPromise().then((testQuestions) => testQuestions)
  }



  async getTestWithQuestions(testId: number): Promise<any> {
    try {
      const url = `${this.jsonServerURLTest}/${testId}`;
      const testRes: any = await this.http.get(url).toPromise();

      if (testRes) {
        const testQuestions = await this.getQuestions(testId);
        // Create a new object with 'questions' property and merge the existing properties
        const testResWithQuestions = {
          ...testRes,
          questions: testQuestions
        };

        return testResWithQuestions;
      } else {
        throw new Error('Test not found'); // Handle the case when the test is not found
      }
    } catch (error) {
      console.error('An error occurred while fetching the test:', error);
      throw error; // You can re-throw the error or handle it as needed
    }
  }


  private getQuestions(testId: number): Promise<any> {
    const url = `${this.jsonServerURLTestQuestion}/?testID=${testId}`;
    return this.http.get(url)
      .toPromise().then((testQuestions) => testQuestions)
  }

  async getTestAttemptForAssignment(assignmentID: number): Promise<any> {
    
      return this.http.get(this.jsonServerURLAttempt + '/?testAssignmentID=' + assignmentID)
      .toPromise().then((attempted) => attempted)
  }

  async getAllAttemptsForTest(testID: number): Promise<TestAttempt[]> {
    try {
      const response = await this.http.get(this.jsonServerURLAttempt + '/?testID=/' + testID)
        .toPromise();
      const attempts: TestAttempt[] = response as TestAttempt[];
      return attempts

    } catch (error) {
      console.log(error);
      return []
    }
  }

  async saveTestAttempt(attemptData: any) {
    let answers = attemptData.answers;
    delete attemptData.answers;

    try {
      const res = await this.http.post(this.jsonServerURLAttempt, attemptData)
        .toPromise()

      const attemptRes: TestAttempt = res as TestAttempt;
      try {
        answers.forEach((a: any) => {
          a.attemptID = attemptRes.id
          this.http.post(this.jsonServerURLAnswer, a)
            .toPromise()
        });
      }
      catch (err) {
        console.log(err);
      }
    }
    catch (error) {
      console.log(error);
    }
    return
  }
}

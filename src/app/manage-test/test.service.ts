import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Test } from '../models/test.model';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
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

  private jsonServerURLQuestion = 'http://localhost:3000/test-question';

  questions: any;
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
  }

  async getMatchedTestQuestions(testId: number): Promise<any> {
    const url = `${this.jsonServerURLQuestion}/?testID=${testId}`;
    return this.http.get(url)
      .toPromise().then((testQuestionData) => testQuestionData)
  }




  async getTest(testId: number): Promise<any> {
    const url = `${this.jsonServerURLTest}/${testId}`;
    return this.http.get(url)
      .toPromise().then((testData) => testData)
  }

  async getAllTest(): Promise<any> {
    return this.http.get(this.jsonServerURLTest)
      .toPromise().then((testData) => testData)
  }



  async saveTest(test: any): Promise<any> {
    this.questions = test.questions;
    delete test.questions;
    let testDataSave: Test | undefined = test;

    if (test.id === 0) {
      delete test.id;
      const testData = await this.http.post(this.jsonServerURLTest, test, this.options).toPromise();
      testDataSave = testData as Test;
    } else {
      const url = `${this.jsonServerURLTest}/${test.id}`;
      await this.http.put(url, test).toPromise();
    }
    const questionArry = [];
    if (this.questions.length > 0) {
      for (const question of this.questions) {
        if (question.id === 0) {
          delete question.id;
          if (testDataSave !== undefined) {
            question.testID = testDataSave.id;
            questionArry.push(await this.httpPostQuestion(question));
          }
        } else {
          const url = `${this.jsonServerURLQuestion}/${question.id}`;
          questionArry.push(await this.httpPutQuestion(url, question));
        }
      }
      return questionArry
    }
    return testDataSave
  }

  private async httpPostQuestion(question: any): Promise<any> {
    return this.http.post(this.jsonServerURLQuestion, question, this.options).toPromise();
  }

  private async httpPutQuestion(url: string, question: any): Promise<any> {
    return this.http.put(url, question).toPromise();
  }

  async deleteTest(testId: number): Promise<any> {
    if (!testId) {
      return Promise.reject(new Error('Test ID is undefined'));
    }
    const url = `${this.jsonServerURLTest}/${testId}`;
    return this.http.patch(url, { isDeleted: true }, this.options)
      .toPromise()
  }

  async unDeleteTest(testId: number): Promise<any> {
    const url = `${this.jsonServerURLTest}/${testId}`;
    return this.http.patch(url, { isDeleted: false }, this.options)
      .toPromise()

  };



}


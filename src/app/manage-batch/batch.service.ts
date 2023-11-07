import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(
    private http: HttpClient
  ) { }

  private jsonServerURL = 'http://localhost:4000/batch';

  // headers and options are properties that define the headers to be used in HTTP requests, and the options to be used with those headers.
  // The headers for the HTTP requests
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // The options for the HTTP requests
  options = { headers: this.headers };

  async saveBatch(batch: any): Promise<any> {

    console.table(batch);
    if (batch.id === 0) {
      delete batch.id;
      return this.http.post(this.jsonServerURL, batch, this.options).toPromise();
    } else {
      const url = `${this.jsonServerURL}/${batch.id}`;
      return this.http.put(url, batch).toPromise()
        .catch((ex) => console.log(ex));
    }
  }

  async getbatch(batchId: number): Promise<any> {
    return this.http.get(this.jsonServerURL + '/' + batchId)
      .toPromise().then((batchData) => batchData)
      .catch((ex) => console.log(ex));
  }


  async getAllBatches(): Promise<any> {
    return this.http.get(this.jsonServerURL)
      .toPromise().then((batchData) => batchData)
      .catch((ex) => console.log(ex));
  }

  async deleteBatch(batchId: number): Promise<any> {
    if (!batchId) {
      return Promise.reject(new Error('batch ID is undefined'));
    }
    const url = `${this.jsonServerURL}/${batchId}`;
    return this.http.patch(url, { isDeleted: true }, this.options)
      .toPromise()
      .catch((ex) => console.log(ex));
  }

  async unDeleteBatch(batchId: number): Promise<any> {
    const url = `${this.jsonServerURL}/${batchId}`;
    return this.http.patch(url, { isDeleted: false }, this.options)
      .toPromise()
      .catch((ex) => console.log(ex));
  }


}

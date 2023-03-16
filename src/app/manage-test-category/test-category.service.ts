import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestCategoryService {

  constructor(
    private http: HttpClient
  ) { }

  private jsonServerURL = 'http://localhost:3000/test-category';

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  options = { headers: this.headers };

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
        .catch((ex) => console.log(ex));
    }
  }

  async getCategory(categoryId: number):Promise<any> {
    return this.http.get(this.jsonServerURL+'/'+categoryId)
    .toPromise().then((testCategoryData) => testCategoryData)
    .catch((ex) => console.log(ex));
  }


  async getAllCategories(): Promise<any> {
    return this.http.get(this.jsonServerURL)
      .toPromise().then((testCategoryData) => testCategoryData)
      .catch((ex) => console.log(ex));
  }

  async deleteCategory(categoryData: any): Promise<any> {
    if (!categoryData.id) {
      return Promise.reject(new Error('Category ID is undefined'));
    }
    const url = `${this.jsonServerURL}/${categoryData.id}`;
    return this.http.put(url, categoryData, this.options)
      .toPromise()
      .catch((ex) => console.log(ex));
  }


}

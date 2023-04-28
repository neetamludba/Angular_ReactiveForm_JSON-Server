import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TestService } from '../test.service';
import { Test } from 'src/app/models/test.model';
import { TestCategory } from 'src/app/models/category.model';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements AfterViewInit {
  constructor(
    private testService: TestService,
    private router: Router,
  ) { }

  displayedColumns: string[] = [
    'description',
    'category',
    'active',
    'createdDate',
    'actions',
  ];

  dataSource = new MatTableDataSource<Test>([]);

  testCategories: TestCategory[] = [];

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  ngAfterViewInit() {
    this.getAllTest();
    this.getAllTestCategories();
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  getAllTest() {
    this.testService.getAllTest().then((tests) => {
      let filteredTests = tests.filter((object: { isDeleted: boolean }) => {
        return object.isDeleted == false
      });
      this.dataSource = new MatTableDataSource<Test>(filteredTests);
      this.dataSource.sort = this.sort;
    });
  }

  getAllTestCategories() {
    this.testService
      .getAllCategories()
      .then((categories) => {
        this.testCategories = categories;
      })
      .catch((err) => console.log(err));
  }

  createTest() {
    this.router.navigateByUrl('test/create').catch((error) => {
      console.log(error);
    });
  }

  deleteTest(testId: any) {
    this.testService.deleteTest(testId)
      .catch((ex) => console.log(ex));

    this.getAllTest();
  }

  gotoDeletedTests() {
    this.router.navigateByUrl('test/deleted').catch((error) => {
      console.log(error);
    });
  }
}

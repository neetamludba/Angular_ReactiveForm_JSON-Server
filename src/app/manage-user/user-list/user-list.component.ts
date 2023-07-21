import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit {
  batches: any;
  constructor(private userService: UserService, private router: Router) { }

  displayedColumns: string[] = [
    'email',
    'firstName',
    'lastName',
    'password',
    'batch',
    'role',
    'registrationDate',
    'active',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  ngAfterViewInit() {
    this.getAllbatches();
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().then((users) => {
      let filteredUseres = users.filter((user: { isDeleted: boolean; }) => user.isDeleted === false);
      this.dataSource = new MatTableDataSource<User>(filteredUseres);
      this.dataSource.sort = this.sort;
      console.table(filteredUseres);
    });
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  getAllbatches() {
    this.userService
      .getAllBatches()
      .then((batches) => {
        this.batches = batches;
      })
      .catch((err) => console.log(err));
  }
  deleteUser(id: number) {
    this.userService.deleteUser(id).catch((error) => {
      console.log(error);
    }
    );
    this.getAllUsers();

  }

  createUser() {
    this.router.navigateByUrl('user/create').catch((error) => {
      console.log(error);
    });
  }

  gotoDeletedUsers() {
    this.router.navigateByUrl('user/deleted').catch((error) => {
      console.log(error);
    });
  }
}

import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list-deleted',
  templateUrl: './user-list-deleted.component.html',
  styleUrls: ['./user-list-deleted.component.css']
})
export class UserListDeletedComponent {


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
    this.getAllDeletedUsers();
  }
  getAllDeletedUsers() {
    this.userService.getAllUsers().then((users) => {
      let filteredUseres = users.filter((user: { isDeleted: boolean; }) => user.isDeleted === true);
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

  unDeleteUser(id: number) {
    this.userService.unDeleteUser(id).catch((error) => {
      console.log(error);
    }
    );
    
    this.getAllDeletedUsers();
  }

  gotoUser() {
    this.router.navigateByUrl('/user').catch((error) => {
      console.log(error);
    });
  }


}

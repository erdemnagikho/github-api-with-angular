import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: IUser[];
  loading: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private gitHubService: GithubService
  ) {}

  ngOnInit() {
    /*
    If there is a favorite user in localstorage,
    first we list it.
    */
    if (JSON.parse(localStorage.getItem('favUsers')) !== null) {
      this.users = JSON.parse(localStorage.getItem('favUsers'));
    }
    this.spinner.show();
  }

  /*
   This event for getting result of search from navbar,
   navbar is child component of this component,
   navbar emit the result of search. 
    */
  usersEventHandler($event: IUser[]) {
    this.users = [];
    this.users = $event;
  }

  /*
   This event for getting loading status from navbar,
   loading status for showing loading spinner.
    */
  loadingEventHandler($event: boolean) {
    this.loading = $event;
  }

  addToFavorite(user: IUser) {
    this.gitHubService.addToFavorite(user);
  }

  isAddedToFav(user: IUser) {
    return this.gitHubService.isAddedToFav(user);
  }

  removeFromFavorites(user: IUser) {
    this.gitHubService.removeFromFavorites(user);
  }
}

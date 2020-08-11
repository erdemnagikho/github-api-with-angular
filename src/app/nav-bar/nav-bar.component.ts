import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IUser } from '../models/user';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  users: IUser[];
  loading: boolean = false;
  query: string = '';

  @Output() usersEvent = new EventEmitter<IUser[]>();
  @Output() loadingEvent = new EventEmitter<boolean>();

  constructor(private gitHubService: GithubService) {}

  ngOnInit(): void {}

  searchUsers() {
    /**
     * First we check query empty or not
     * We set timeout because we do not want request to api continuous.
     * We emit result of search to users-list component.
     */
    if (this.query !== '') {
      this.loading = true;
      this.loadingEvent.emit(this.loading);
      let vm = this;
      setTimeout(function () {
        vm.gitHubService.updateSearchQuery(vm.query);
        vm.gitHubService.searchUsersByUsername().subscribe(
          (response) => {
            vm.loading = false;
            vm.loadingEvent.emit(vm.loading);
            vm.users = response.items;
            vm.usersEvent.emit(vm.users);
          },
          (error) => {
            console.log(error);
            vm.loading = false;
            vm.loadingEvent.emit(vm.loading);
          }
        );
      }, 2000);
    }
  }
}

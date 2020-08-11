import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../github.service';
import { IUser } from '../models/user';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: IUser;
  loading: boolean = false;
  favUsers: IUser[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private gitHubService: GithubService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.loading = true;

    let login = this.activatedRoute.snapshot.paramMap.get('login');
    this.gitHubService.getUserProfile(login).subscribe(
      (response) => {
        this.loading = false;
        this.user = response;
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
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

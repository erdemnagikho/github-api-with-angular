import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISearch } from './models/search';
import { IUser } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private baseUrl = 'https://api.github.com/';
  private username: string = '';
  private favUsers: IUser[] = [];

  constructor(private http: HttpClient) {}

  searchUsersByUsername() {
    return this.http.get<ISearch>(
      this.baseUrl + `search/users?q=${this.username}`
    );
  }

  updateSearchQuery(q: string) {
    this.username = q;
  }

  getUserProfile(login: string) {
    return this.http.get<IUser>(this.baseUrl + `users/${login}`);
  }

  /**
   * This method is for showing Add Or Remove Button
   * If the user not in list, we show add button
   * If the user is in list, we show remove button.
   */
  isAddedToFav(user: IUser) {
    if (JSON.parse(localStorage.getItem('favUsers')) !== null) {
      this.favUsers = JSON.parse(localStorage.getItem('favUsers'));
      return this.favUsers.some((u) => u.id === user.id);
    }
  }

  /**
   * First we get favorite users from localstorage if it is not null
   * Then we check user it is in list.
   * Then we remove the user and we set new favorites array to localstorage.
   */
  removeFromFavorites(user: IUser) {
    if (JSON.parse(localStorage.getItem('favUsers')) !== null) {
      this.favUsers = JSON.parse(localStorage.getItem('favUsers'));
      if (this.favUsers.some((u) => u.id === user.id)) {
        let newFavUsers = this.favUsers.filter(
          (favUser) => favUser.id !== user.id
        );
        localStorage.setItem('favUsers', JSON.stringify(newFavUsers));
      }
    }
  }

  addToFavorite(user: IUser) {
    /**
     * First we check favorite users in localstorage
     * If it is null, we add the user favorite users array.
     * Then we set the array to localstorage.
     */
    if (JSON.parse(localStorage.getItem('favUsers')) === null) {
      this.favUsers.unshift(user);
      localStorage.setItem('favUsers', JSON.stringify(this.favUsers));
    } else {
      /**
       * If localstorage is not null
       * We get the favorite users from localstorage.
       */
      this.favUsers = JSON.parse(localStorage.getItem('favUsers'));
      /**
       * If user already in array
       * We do not add the user to array.
       */
      if (this.favUsers.some((favUser) => favUser.id === user.id)) {
        //console.log('Already in list');
      } else {
        /**
         * We check array length
         * If length is more than 5
         * We do not add the user to array
         */
        if (this.favUsers.length < 5) {
          this.favUsers.unshift(user);
          localStorage.setItem('favUsers', JSON.stringify(this.favUsers));
        } else {
          //console.log('Can not be more than 5');
        }
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getUsers(): User[] {
    let user1 = new User();
    user1.Id = 1;
    user1.Username = "User1";
    user1.Password = "123";
    user1.Groups = [];

    let user2 = new User();
    user2.Id = 2;
    user2.Username = "User2";
    user2.Password = "123";
    user2.Groups = [];

    return [user1, user2];
  }
}

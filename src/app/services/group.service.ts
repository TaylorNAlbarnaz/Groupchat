import { Injectable } from '@angular/core';
import { Group } from '../models/group';
import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor() { }

  public getGroups(users: User[], messages: Message[]): Group[] {
    let group1 = new Group();
    group1.Id = 1;
    group1.Name = "Grupo";
    group1.Password = "123";
    group1.Admin = users[0];
    group1.Participants = [...users];
    group1.Messages = [...messages];

    return [group1];
  }
}

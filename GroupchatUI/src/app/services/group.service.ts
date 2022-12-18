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
    group1.id = 1;
    group1.name = "Grupo";
    group1.password = "123";
    group1.admin = users[0];
    group1.participants = [...users];
    group1.messages = [...messages];

    return [group1];
  }
}

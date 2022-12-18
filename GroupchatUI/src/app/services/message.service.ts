import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  public getMessages(users: User[]): Message[] {
    let message1 = new Message();
    message1.id = 1;
    message1.owner = users[0];
    message1.content = "Mensagem 1";

    let message2 = new Message();
    message2.id = 2;
    message2.owner = users[0];
    message2.content = "Mensagem 2";

    return [message1, message2];
  }
}

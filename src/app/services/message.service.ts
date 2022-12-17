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
    message1.Owner = users[0];
    message1.Content = "Conteúdo da Mensagem 1";

    let message2 = new Message();
    message2.Owner = users[0];
    message2.Content = "Conteúdo da Mensagem 2";

    return [message1, message2];
  }
}

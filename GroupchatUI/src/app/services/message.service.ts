import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Message } from '../models/message';
import { MessageDto } from '../models/messageDto';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = "Group/Messages";

  constructor(private http: HttpClient) { }

  public getMessages(groupId: number, messageQnt: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiUrl}/${this.url}/${groupId}/${messageQnt}`);
  }

  public getMessageQnt(groupId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${this.url}/${groupId}`, { responseType: 'text'});
  }

  public sendMessage(groupId: number, messageDto: MessageDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.url}/${groupId}`, {
      userId: messageDto.userId,
      content: messageDto.content
    },
    { responseType: 'text' });
  }
}

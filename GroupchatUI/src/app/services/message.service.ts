import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = "Messages";

  constructor(private http: HttpClient) { }

  public getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiUrl}/${this.url}`);
  }
}

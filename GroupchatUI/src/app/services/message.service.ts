import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = "Group/Messages";

  constructor(private http: HttpClient) { }

  public getMessages(id: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}

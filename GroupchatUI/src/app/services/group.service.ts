import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Group } from '../models/group';
import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private url = "Groups";

  constructor(private http: HttpClient) { }
  
  public getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getGroupById(id: Number): Observable<Group> {
    return this.http.get<Group>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}

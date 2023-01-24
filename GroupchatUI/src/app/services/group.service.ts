import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Group } from '../models/group';
import { GroupDto } from '../models/groupDto';
import { LoginDto } from '../models/loginDto';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private url = "Groups";

  constructor(private http: HttpClient) { }
  
  public getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getGroupById(id: number): Observable<GroupDto> {
    return this.http.get<GroupDto>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public deleteGroup(id: number, loginDto: LoginDto) {
    return this.http.delete<GroupDto>(`${environment.apiUrl}/${this.url}/${id}/${loginDto.email}/${loginDto.password}`);
  }
}

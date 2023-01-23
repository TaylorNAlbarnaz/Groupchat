import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { LoginDto } from '../models/loginDto';
import { User } from '../models/user';
import { UserDto } from '../models/userDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "Users";

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getUser(id: number, loginDto: LoginDto): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/${this.url}/${id}`, {
      email: loginDto.email,
      password: loginDto.password
    })
  }

  public updateUser(user: UserDto) {
    return this.http.put(`${environment.apiUrl}/${this.url}`, {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password
    },
    { responseType: 'text' })
  }

  public deleteUser(id: number, loginDto: LoginDto): Observable<any> {
    return this.http.delete<User>(`${environment.apiUrl}/${this.url}/${id}/${loginDto.email}/${loginDto.password}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Group } from '../models/group';
import { GroupDto } from '../models/groupDto';
import { Login } from '../models/login';
import { LoginDto } from '../models/loginDto';
import { UserDto } from '../models/userDto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = "Users";

  constructor(private http: HttpClient) { }
  
  public login(credentials: LoginDto): Observable<Login> {
    return this.http.post<Login>(`${environment.apiUrl}/${this.url}/Login`, {
      email: credentials.email,
      password: credentials.password
    });
  }

  public register(credentials: UserDto): Observable<Login> {
    return this.http.get<Login>(`${environment.apiUrl}/${this.url}`);
  }
}

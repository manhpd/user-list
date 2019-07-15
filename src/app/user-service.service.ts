import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})


export class UserService {

  constructor( private http: HttpClient) { }
  private usersUrl = 'https://reqres.in/api/users';

  USERS: any[] = [{"id":1,"email":"george.bluth@reqres.in","first_name":"George","last_name":"Bluth","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"},{"id":2,"email":"janet.weaver@reqres.in","first_name":"Janet","last_name":"Weaver","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"},{"id":3,"email":"emma.wong@reqres.in","first_name":"Emma","last_name":"Wong","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"}];
  

  getUsers() : Observable<any> {
    return this.http.get(this.usersUrl);
  }

  
  getUserById(id: number) : Observable<any> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url);
  }


  updateUser (user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.usersUrl, user, httpOptions);
  }

  createUser (user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.usersUrl, user, httpOptions).pipe(
    );
  }

}

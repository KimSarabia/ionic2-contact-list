import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {User} from '../../user.ts';


@Injectable()
export class UserService {
  usersUrl = "/api/users"

  constructor(public http: Http) {}

  create(user: User): Observable<User> {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(this.usersUrl, body, {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  signIn(user: User): Observable<User> {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('/api/sessions', body, {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get('/api/sessions')
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }
}

import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Friend} from '../../friend.ts';


@Injectable()
export class FriendService {
  friendsUrl = "/api/friends"

  constructor(public http: Http) {}
  load(): Observable<Friend[]> {
    return this.http.get(this.friendsUrl)
               .map(res => res.json())
               .catch(this.handleError);
  }
  add(friend: string): Observable<Friend> {
    let body = JSON.stringify({firstName: friend, lastName: friend, email: friend, phone: friend, bio: friend, imgUrl: friend});
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(this.friendsUrl, body, {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
  }
  update(friend: Friend) {
    let url = `${this.friendsUrl}/${friend._id}`;
    let body = JSON.stringify(friend)
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put(url, body, {headers: headers})
                    .map(() => friend) //See mdn.io/arrowfunctions
                    .catch(this.handleError);
  }
  delete(friend: Friend) {
    let url = `${this.friendsUrl}/${friend._id}`;
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.delete(url, headers)
               .catch(this.handleError);
  }

  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }
}

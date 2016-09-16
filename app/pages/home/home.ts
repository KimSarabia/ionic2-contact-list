//home.ts
import {Component} from "@angular/core";
import {ItemSliding, Item} from 'ionic-angular';
import {FriendService} from '../../providers/friend-service/friend-service';
import {Friend} from '../../friend.ts';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [FriendService]
})
export class HomePage {
public friends: Friend[];

constructor(public friendService: FriendService) {
  this.loadFriends();
}

loadFriends() {
  this.friendService.load()
      .subscribe(data => {
        this.friends = data;
      })
  }
}

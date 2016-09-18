import {Component} from "@angular/core";
import {NavController, ItemSliding, Item} from 'ionic-angular';
import {FriendEditPage} from '../friend-edit/friend-edit';
import {FriendAddPage} from '../friend-add/friend-add';

import {FriendService} from '../../providers/friend-service/friend-service';
import {Friend} from '../../friend.ts';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [FriendService]
})
export class HomePage {
  public friends: Friend[];

  constructor(public friendService: FriendService,
              public nav: NavController) {
    this.loadFriends();
  }

  loadFriends() {
    this.friendService.load()
      .subscribe(friendList => {
        this.friends = friendList;
      })
  }

  deleteFriend(friend: Friend, index:number) {
    this.friendService.delete(friend)
        .subscribe(res => {
          this.friends.splice(index, 1);
        });
  }

  navToEdit(friend: Friend, index: number) {
    this.nav.push(FriendEditPage, {
      friend: friend,
      friends: this.friends,
      index: index
    });
  }

  navToAdd(friend: Friend, index: number) {
    this.nav.push(FriendAddPage, {
      friend: friend,
      friends: this.friends,
      index: index
    });
  }
}

import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import {FriendService} from '../../providers/friend-service/friend-service';
import {Friend} from '../../friend.ts';

@Component({
  templateUrl: 'build/pages/friend-edit/friend-edit.html',
  providers: [FriendService]
})
export class FriendEditPage {
  public friend: Friend;    // The friend itself
  public friends: Friend[]; // The list of friends from the main page
  public index: number; // The index of the friend we're looking at

  constructor(public friendService: FriendService, public nav: NavController, public navParams: NavParams ) {
    this.friend = navParams.get('friend');
    this.friends = navParams.get('friends');
    this.index = navParams.get('index');
  }

  saveFriend(updatedFirstName: string) {
    this.friend.firstName = updatedFirstName;
    this.friendService.update(this.friend)
        .subscribe(res => {
          this.nav.pop(); // go back to friend list
        });
  }

  deleteFriend() {
    this.friendService.delete(this.friend)
      .subscribe(res => {
        this.friends.splice(this.index, 1); // remove the friend
        this.nav.pop(); //go back to friend list
      });
  }
}

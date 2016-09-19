import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import {FriendService} from '../../providers/friend-service/friend-service';
import {HomePage} from '../home/home';
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

  saveFriend(updatedFirstName: string, updatedLastName: string, updatedPhone: string, updatedEmail: string, updatedBio: string, updatedImgUrl: string) {
    this.friend.firstName = updatedFirstName;
    this.friend.lastName = updatedLastName;
    this.friend.phone = updatedPhone;
    this.friend.email = updatedEmail;
    this.friend.bio = updatedBio;
    this.friend.imgUrl = updatedImgUrl;
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

  navToHome(friend: Friend, index: number) {
    this.nav.push(HomePage, {
      friend: friend,
      friends: this.friends,
      index: index
    });
  }
}

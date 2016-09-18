import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import {FriendService} from '../../providers/friend-service/friend-service';
import {HomePage} from '../home/home';
import {Friend} from '../../friend.ts';

@Component({
  templateUrl: 'build/pages/friend-add/friend-add.html',
  providers: [FriendService]
})
export class FriendAddPage {
  public friend: Friend;    // The friend itself
  public friends: Friend[]; // The list of friends from the main page
  public index: number; // The index of the friend we're looking at

  constructor(public friendService: FriendService, public nav: NavController, public navParams: NavParams ) {
    this.friend = navParams.get('friend');
    this.friends = navParams.get('friends');
    this.index = navParams.get('index');
  }

    addFriend(friendFirstName:string, friendLastName:string) {
      let friend: Friend = {
        _id: 0,
        firstName: friendFirstName,
        lastName: friendLastName,
        email: '',
        phone: '',
        bio: '',
        imgUrl: ''
      };

      this.friendService.add(friend)
          .subscribe(newFriend  => {
            this.friends.push(newFriend);
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

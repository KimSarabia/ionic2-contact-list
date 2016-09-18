import {Component} from "@angular/core";
import {NavController, ItemSliding, Item} from 'ionic-angular';
import {DashboardPage} from '../dashboard/dashboard';
import {FriendService} from '../../providers/friend-service/friend-service';
import {Friend} from '../../friend.ts';

@Component({
  templateUrl: 'build/pages/welcome/welcome.html',
  providers: [FriendService]
})
export class WelcomePage {
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

  navToDash(friend: Friend, index: number) {
    this.nav.push(DashboardPage, {
      friend: friend,
      friends: this.friends,
      index: index
    });
  }
}

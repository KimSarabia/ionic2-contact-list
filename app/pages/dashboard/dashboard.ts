import {Component} from "@angular/core";
import {NavController, NavParams, MenuController} from 'ionic-angular';
import {WelcomePage} from '../welcome/welcome';
import {HomePage} from '../home/home';
import {FriendAddPage} from '../friend-add/friend-add';

import {FriendService} from '../../providers/friend-service/friend-service';
import {Friend} from '../../friend.ts';

@Component({
  templateUrl: 'build/pages/dashboard/dashboard.html',
  providers: [FriendService]
})
export class DashboardPage {
  // public curruser: NavigatorUserMedia;    // The user itself
  public friend: Friend;    // The friend itself
  public friends: Friend[]; // The list of friends from the main page
  public index: number; // The index of the friend we're looking at
  public currentUser: any;
  constructor(public friendService: FriendService, public nav: NavController, public navParams: NavParams, public menuCtrl: MenuController ) {
    // this.curruser= navParams.get('friend');
    console.log(navParams);
    this.currentUser = navParams.get('username');
  }

  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }
  navToHome(friend: Friend, index: number) {
    this.nav.push(HomePage, {
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

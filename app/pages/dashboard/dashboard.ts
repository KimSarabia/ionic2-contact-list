import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import {WelcomePage} from '../welcome/welcome';
import {FriendService} from '../../providers/friend-service/friend-service';
import {Friend} from '../../friend.ts';

@Component({
  templateUrl: 'build/pages/dashboard/dashboard.html',
  providers: [FriendService]
})
export class DashboardPage {
  // public curruser: NavigatorUserMedia;    // The user itself

  constructor(public friendService: FriendService, public nav: NavController, public navParams: NavParams ) {
    // this.curruser= navParams.get('friend');
  }
}

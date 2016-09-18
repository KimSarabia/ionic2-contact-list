import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import {FriendService} from '../../providers/friend-service/friend-service';
import {HomePage} from '../home/home';
import {Friend} from '../../friend.ts';

@Component({
  templateUrl: 'build/pages/friend-edit/friend-add.html',
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

    addFriend(friend:string) {
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

// import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
//
// /*
//   Generated class for the FriendAddPage page.
//
//   See http://ionicframework.com/docs/v2/components/#navigation for more info on
//   Ionic pages and navigation.
// */
// @Component({
//   templateUrl: 'build/pages/friend-add/friend-add.html',
// })
// export class FriendAddPage {
//
//   constructor(private navCtrl: NavController) {
//
//   }
//
// }

// import {Component} from "@angular/core";
// import {NavController, ItemSliding, Item} from 'ionic-angular';
// import {FriendEditPage} from '../friend-edit/friend-edit';
// import {FriendService} from '../../providers/friend-service/friend-service';
// import {Friend} from '../../friend.ts';
//
// @Component({
//   templateUrl: 'build/pages/home/home.html',
//   providers: [FriendService]
// })
// export class HomePage {
//   public friends: Friend[];
//
//   constructor(public friendService: FriendService,
//               public nav: NavController) {
//     this.loadFriends();
//   }
//
//   loadFriends() {
//     this.friendService.load()
//       .subscribe(friendList => {
//         this.friends = friendList;
//       })
//   }
//
//   addFriend(friend:string) {
//     this.friendService.add(friend)
//         .subscribe(newFriend  => {
//           this.friends.push(newFriend);
//         });
//   }
//
//   // toggleComplete(friend: Friend) {
//   //   friend.isComplete = !friend.isComplete;
//   //   this.friendService.update(friend)
//   //       .subscribe(updatedFriend => {
//   //         friend = updatedFriend;
//   //       });
//   // }
//
//   deleteFriend(friend: Friend, index:number) {
//     this.friendService.delete(friend)
//         .subscribe(res => {
//           this.friends.splice(index, 1);
//         });
//   }
//
//   navToEdit(friend: Friend, index: number) {
//     this.nav.push(FriendEditPage, {
//       friend: friend,
//       friends: this.friends,
//       index: index
//     });
//   }
// }

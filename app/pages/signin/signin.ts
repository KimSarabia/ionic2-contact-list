import {Component} from "@angular/core";
import {NavController, ItemSliding, Item} from 'ionic-angular';
import {DashboardPage} from '../dashboard/dashboard';
import {UserService} from '../../providers/user-service/user-service';
import {User} from '../../user.ts';

@Component({
  templateUrl: 'build/pages/signin/signin.html',
  providers: [UserService]
})

export class SignInPage {
  user: any = {username: '', password: ''};
  constructor(public userService: UserService,
              public nav: NavController) {
                this.userService.getCurrentUser()
                  .subscribe(user => {
                    this.nav.push(DashboardPage, {username: user.username});
                  });
  }

  signIn() {
    let newUser: User = {
      username: this.user.username,
      password: this.user.password
    };
    this.userService.signIn(newUser)
      .subscribe(user => {
        this.nav.push(DashboardPage, {username: user.username});
      });
  }
}



//
// import {Component} from "@angular/core";
// import {NavController, NavParams} from 'ionic-angular';
// import {FriendService} from '../../providers/friend-service/friend-service';
// import {HomePage} from '../home/home';
// import {Friend} from '../../friend.ts';
//
// @Component({
//   templateUrl: 'build/pages/friend-add/friend-add.html',
//   providers: [FriendService]
// })
// export class FriendAddPage {
//   public friend: Friend;    // The friend itself
//   public friends: Friend[]; // The list of friends from the main page
//   public index: number; // The index of the friend we're looking at
//
//   constructor(public friendService: FriendService, public nav: NavController, public navParams: NavParams ) {
//     this.friend = navParams.get('friend');
//     this.friends = navParams.get('friends');
//     this.index = navParams.get('index');
//   }
//
//     addFriend(friendFirstName:string, friendLastName:string, friendEmail:string, friendPhone:string, friendBio:string, friendImgUrl:string) {
//       let friend: Friend = {
//         _id: 0,
//         firstName: friendFirstName,
//         lastName: friendLastName,
//         email: friendEmail,
//         phone: friendPhone,
//         bio: friendBio,
//         imgUrl: friendImgUrl
//       };
//
//       this.friendService.add(friend)
//           .subscribe(newFriend  => {
//             this.friends.push(newFriend);
//           });
//     }
//
//
//
//     navToHome(friend: Friend, index: number) {
//       this.nav.push(HomePage, {
//         friend: friend,
//         friends: this.friends,
//         index: index
//       });
//     }
// }

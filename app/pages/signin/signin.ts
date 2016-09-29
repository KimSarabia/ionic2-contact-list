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

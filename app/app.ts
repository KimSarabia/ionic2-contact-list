import {Component} from "@angular/core";
import {ionicBootstrap, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {WelcomePage} from './pages/welcome/welcome';
import {SignInPage} from './pages/signin/signin';
import {HomePage} from './pages/home/home';



@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
})
export class MyApp {

  rootPage: any = SignInPage;

  constructor(platform: Platform) {
    // this.rootPage = TabsPage;

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);

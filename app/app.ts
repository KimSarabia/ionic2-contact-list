import {Component} from "@angular/core";
import {ionicBootstrap, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {WelcomePage} from './pages/welcome/welcome';
import {HomePage} from './pages/home/home';
import { TabsPage } from './pages/tabs/tabs';



@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
})
export class MyApp {

  rootPage: any = WelcomePage;

  constructor(platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);

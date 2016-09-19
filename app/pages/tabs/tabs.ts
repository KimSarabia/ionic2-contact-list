import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { FriendAddPage } from '../friend-add/friend-add';
import { FriendEditPage } from '../friend-edit/friend-edit';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = FriendAddPage;
    this.tab3Root = FriendEditPage;
  }
}

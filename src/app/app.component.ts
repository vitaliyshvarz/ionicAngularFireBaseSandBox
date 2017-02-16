import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { AngularFire, AuthProviders } from 'angularfire2';
import { AuthData } from '../services/auth.service';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  public rootPage: any = HomePage;
  user = {};
  data: any;
  userName: any;

  constructor(
    public authData: AuthData,
    public platform: Platform,
    public af: AngularFire
  ) {
    this.af.auth.subscribe(user => {

      this.userName = new Promise<string>(function(resolve) {
        if (user) {
          resolve(user.auth.displayName);
        }
      });

      if (user) {
        // user logged in
        this.user = user;
        this.rootPage = HomePage;

      } else {
        // user not logged in
        this.rootPage = LoginPage;
        this.user = {};
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }


  public logout() {
    this.authData.logoutUser();
  }
}

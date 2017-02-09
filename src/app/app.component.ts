import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
  zone: NgZone;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      this.zone = new NgZone({});

      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        this.zone.run(() => {
          if (!user) {
            this.rootPage = LoginPage;
            unsubscribe();
          } else {
            this.rootPage = HomePage;
            unsubscribe();
          }
        });
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}

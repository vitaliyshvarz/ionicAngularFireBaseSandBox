import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthData {
  // Here we declare the variables we'll be using.
  public fireAuth: any;
  public userProfile: any;

  constructor(
    firebase: AngularFire
  ) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');
  }

  public loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  public signupUser(email: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        this.userProfile.child(newUser.uid).set({ email: email });
      });
  }

  public resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  public logoutUser(): any {
    return this.fireAuth.signOut();
  }
}

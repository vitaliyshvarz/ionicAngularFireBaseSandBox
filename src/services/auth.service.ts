import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import * as Firebase from 'firebase';


@Injectable()

export class AuthData {
  // Here we declare the variables we'll be using.
  public fireAuth: any;
  public userProfile: any;
  private _firebase: Firebase;


  constructor(
    public af: AngularFire
  ) {
    //this.fireAuth = firebase.auth();
    //this.userProfile = firebase.database().ref('/userProfile');
  }

  public loginUserGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect
    });
  }

  public loginUserFacebook() {
    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Redirect
    });
  }
  public loginUser(email: string, password: string): any {
    return this.af.auth.login({
      email: email,
      password: password,
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

  public signupUser(email: string, password: string): any {
    //
  }

  public resetPassword(email): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._firebase.resetPassword(email, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  public logoutUser(): any {
    return this.af.auth.logout();
  }
}

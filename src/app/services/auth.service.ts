
import { AuthInfo } from '../login/authinfo';
import { EmailPasswordCredentials } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';





@Injectable()
export class AuthService {


  static UNKNOWN_USER = new AuthInfo(null);

  authInfo$: BehaviorSubject<AuthInfo> =
  new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  constructor(private af: AngularFire) {
   

   }

  console

  login(email, password): Observable<FirebaseAuthState> {
    return this.fromFirebaseAuthPromise(this.af.auth.login({ email, password }));
  }

  fromFirebaseAuthPromise(promise): Observable<any> {
    const subject = new Subject<any>();

    promise
      .then(res => {
        const authInfo = new AuthInfo(this.af.auth.getAuth().uid);
        this.authInfo$.next(authInfo);
        subject.next(res);
        subject.complete();
      },
      err => {
        this.authInfo$.error(err);
        subject.error(err);
        subject.complete();
      })

    return subject.asObservable();
  }
  logOut() {
    this.af.auth.logout();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
 
  }





}


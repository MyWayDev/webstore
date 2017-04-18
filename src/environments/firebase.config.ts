import {AuthMethods, AuthProviders} from 'angularfire2';

export const firebaseConfig={
   apiKey: "AIzaSyDbwIB0JOp9NddJggQYykSfG9uR2hEwZGU",
    authDomain: "webstore-ac5c7.firebaseapp.com",
    databaseURL: "https://webstore-ac5c7.firebaseio.com",
    storageBucket: "//webstore-myway",
    messagingSenderId: "386747619371"
};

export const authConfig = {
    provider:AuthProviders.Password,
    method:AuthMethods.Password

};

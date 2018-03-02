import * as firebase from 'firebase';

const fbConfig = {
  apiKey: 'AIzaSyAlstqbGZjsDSy__6sM2ZUV3lGe8UEtg58',
  authDomain: 'menu-field.firebaseapp.com',
  databaseURL: 'https://menu-field.firebaseio.com',
  projectId: 'menu-field',
  storageBucket: 'menu-field.appspot.com',
  messagingSenderId: '531651691827',
};

export function initFirebase() {
  firebase.initializeApp(fbConfig);
}


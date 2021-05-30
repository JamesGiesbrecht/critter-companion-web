/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCV8AlfzoBhfBZ3ZUVyz76mYLjNjM571tc',
  authDomain: 'critter-companion-cfda6.firebaseapp.com',
  projectId: 'critter-companion-cfda6',
  storageBucket: 'critter-companion-cfda6.appspot.com',
  messagingSenderId: '501051862820',
  appId: '1:501051862820:web:854f1b0b2ea46d23524db1',
  measurementId: 'G-HB564H7EWC',
}

firebase.initializeApp(firebaseConfig)

// eslint-disable-next-line import/prefer-default-export
export const firebaseAuth = firebase.auth()

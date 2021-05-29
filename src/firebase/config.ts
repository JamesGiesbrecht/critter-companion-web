/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCYtc2ys7Yvv0-U0XBlKYjPJxxZrzDT9II',
  authDomain: 'critter-companion.firebaseapp.com',
  projectId: 'critter-companion',
  storageBucket: 'critter-companion.appspot.com',
  messagingSenderId: '816350896434',
  appId: '1:816350896434:web:943213ff5e9b980780772b',
  measurementId: 'G-GPTJMKME8Y',
}

firebase.initializeApp(firebaseConfig)

// eslint-disable-next-line import/prefer-default-export
export const firebaseAuth = firebase.auth()

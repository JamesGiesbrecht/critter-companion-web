/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/database'

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_DATABASE,
  REACT_APP_FIREBASE_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
} = process.env

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: 'crittercompanion.app',
  databaseURL: `https://${REACT_APP_FIREBASE_DATABASE}.firebaseio.com`,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: `G-${REACT_APP_FIREBASE_MEASUREMENT_ID}`,
}

firebase.initializeApp(firebaseConfig)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = firebase.analytics()

export const firebaseAuth = firebase.auth()
export const firebaseDb = firebase.database()

// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyAbaDvgVTjO-1lc2jncVWCgtR_Sbn-L8bA',

  authDomain: 'stepahead-33526.firebaseapp.com',

  projectId: 'stepahead-33526',

  storageBucket: 'stepahead-33526.appspot.com',

  messagingSenderId: '714020908876',

  appId: '1:714020908876:web:cfa09800d561e62f0ba9e9',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()

export { auth, db }

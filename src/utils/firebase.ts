// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { getDatabase, ref, set, child, get } from 'firebase/database'

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
  databaseURL: 'https://stepahead-33526-default-rtdb.firebaseio.com',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Database
const db = getDatabase(app)

interface UserDataProps {
  uid: string
  name: string
  email: string
}

const WriteUserData = async ({
  uid,
  name,
  email,
}: UserDataProps): Promise<void> => {
  await set(ref(db, 'users/' + uid), {
    name,
    email,
  })
}

const ReadUserData = async (): Promise<void> => {
  const dbRef = ref(db)
  try {
    const res = await get(child(dbRef, 'users'))
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}

// Authentication
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const SignInWithGoogle = async (): Promise<Record<string, any> | undefined> => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    console.log(res)
    return user
  } catch (err) {
    console.log(err)
  }
}

const SignOut = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (err) {
    console.log(err)
  }
}

export { auth, SignInWithGoogle, SignOut, WriteUserData, ReadUserData }

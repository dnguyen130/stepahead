import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { ref, set } from 'firebase/database'
import { FirebaseError } from 'firebase/app'
import { auth, db, googleProvider } from './firebase'

interface UserDataProps {
  uid: string
  name: string | null
  email: string | null
}

interface TodoDataProps {
  uid: string
  userId: string
  title: string
  description: string
  creationDate: string
  dueDate: string
  important: boolean
  complete: boolean
}

interface SignInProps {
  email: string
  password: string
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

const CreateTodo = async ({
  uid,
  userId,
  title,
  description,
  creationDate,
  dueDate,
  important,
  complete,
}: TodoDataProps): Promise<void> => {
  await set(ref(db, 'todos/' + uid), {
    userId,
    title,
    description,
    creationDate,
    dueDate,
    important,
    complete,
  })
}

const SignUpWithEmail = async ({
  email,
  password,
}: SignInProps): Promise<Record<string, any> | unknown> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    console.log(res)
    return res
  } catch (err) {
    if (err instanceof FirebaseError) {
      return err.code
    }
  }
}

const SignInWithGoogle = async (): Promise<Record<string, any> | unknown> => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user

    const activeUserData: UserDataProps = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
    }

    await WriteUserData(activeUserData)

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

export { CreateTodo, SignInWithGoogle, SignOut, SignUpWithEmail }

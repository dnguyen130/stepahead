import { signInWithPopup, signOut } from 'firebase/auth'

import { ref, set } from 'firebase/database'

import { auth, db, googleProvider } from './firebase'

interface UserDataProps {
  uid: string
  name: string | null
  email: string | null
}

interface TodoDataProps {
  uid: string
  userid: string
  title: string
  description: string
  creationDate: string
  dueDate: string
  important: boolean
  complete: boolean
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
  userid,
  title,
  description,
  creationDate,
  dueDate,
  important,
  complete,
}: TodoDataProps): Promise<void> => {
  await set(ref(db, 'todos/' + uid), {
    userid,
    title,
    description,
    creationDate,
    dueDate,
    important,
    complete,
  })
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

export { CreateTodo, SignInWithGoogle, SignOut }

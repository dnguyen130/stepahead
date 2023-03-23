import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { ref, set, get } from 'firebase/database'
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
  creationTime: Date | string
  dueDate: string
  dueTime: Date | string | null
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

const GetAllTodos = async (userId: string, uid: string): Promise<void> => {
  try {
    const initialTodoData = await get(ref(db, `users/${userId}/todos`))
    console.log(initialTodoData.val())
  } catch (err) {
    console.log(err)
  }
}

const CreateTodo = async ({
  uid,
  userId,
  title,
  description,
  creationDate,
  creationTime,
  dueDate,
  dueTime,
  important,
  complete,
}: TodoDataProps): Promise<void> => {
  await set(ref(db, `users/${userId}/todo/` + uid), {
    userId,
    title,
    description,
    creationDate,
    creationTime,
    dueDate,
    dueTime,
    important,
    complete,
  })
}

const SignUpWithEmail = async ({
  email,
  password,
}: SignInProps): Promise<Record<string, any> | string> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user

    const activeUserData: UserDataProps = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
    }

    await WriteUserData(activeUserData)

    return res
  } catch (err) {
    if (err instanceof FirebaseError) {
      const errorCode = err.code
      if (errorCode === 'auth/email-already-in-use') {
        alert('Email already in use')
        return err.code
      } else if (errorCode === 'auth/invalid-email') {
        alert('Invalid Email')
        return err.code
      } else if (password === '') {
        alert('Invalid Password')
        return err.code
      } else if (errorCode === 'auth/weak-password') {
        alert('Password must be at least 6 characters')
        return err.code
      } else {
        console.log(err.message)
        return err.message
      }
    } else {
      console.log(err)
      return 'error'
    }
  }
}

const LogInWithEmail = async ({
  email,
  password,
}: SignInProps): Promise<Record<string, any> | string> => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res
  } catch (err) {
    if (err instanceof FirebaseError) {
      const errorCode = err.code
      if (errorCode === 'auth/invalid-email') {
        alert('Invalid Email')
        return err.code
      } else if (password === '') {
        alert('Invalid Password')
        return err.code
      } else if (errorCode === 'auth/wrong-password') {
        alert('Incorrect Password')
        return err.code
      } else {
        console.log(err.message)
        return err.message
      }
    } else {
      console.log(err)
      return 'error'
    }
  }
}

const SignInWithGoogle = async (): Promise<Record<string, any> | string> => {
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
    if (err instanceof FirebaseError) {
      return err.code
    } else {
      console.log(err)
      return 'error'
    }
  }
}

const SignOut = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (err) {
    console.log(err)
  }
}

export {
  CreateTodo,
  GetAllTodos,
  SignInWithGoogle,
  SignOut,
  SignUpWithEmail,
  LogInWithEmail,
}

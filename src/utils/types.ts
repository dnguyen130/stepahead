export interface UserDataProps {
  uid: string
  name: string
  email: string
}

export interface SignInProps {
  email: string
  password: string
}

export interface TodoDataProps {
  userId: string
  title: string
  description: string
  creationDate: string
  creationTime: string
  dueDate: string
  dueTime: string
  important: boolean
  complete: boolean
}

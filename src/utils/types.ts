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
  uid: string
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

export interface TodoTaskProps extends TodoDataProps {
  onDeleteClick: (e: any) => Promise<void>
  onCompleteClick: (e: any) => Promise<void>
  onTodoClick: (e: any) => void
}

export interface CurrentEventProps {
  uid: string
  title: string
  description: string
  currentDate: Date
  currentTime: string
  dueDate: Date
  dueTime: string
  important: boolean
  complete: boolean
}

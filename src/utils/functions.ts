import { TodoDataProps } from './types'

function AreArraysEqual(
  array1: TodoDataProps[],
  array2: TodoDataProps[]
): boolean {
  // If the arrays have different length, they are not equal
  if (array1.length !== array2.length) {
    return false
  }

  // Iterate over each element of the arrays and compare them
  for (let i = 0; i < array1.length; i++) {
    const obj1 = array1[i]
    const obj2 = array2[i]

    // If the objects are not equal, the arrays are not equal
    if (!AreObjectsEqual(obj1, obj2)) {
      return false
    }
  }

  // If we reach this point, the arrays are equal
  return true
}

function AreObjectsEqual(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): boolean {
  // If the objects have different number of keys, they are not equal
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  if (keys1.length !== keys2.length) {
    return false
  }

  // Iterate over each key of the objects and compare their values
  for (const key of keys1) {
    const value1 = obj1[key]
    const value2 = obj2[key]

    // If the values are not equal, the objects are not equal
    if (value1 !== value2) {
      return false
    }
  }

  // If we reach this point, the objects are equal
  return true
}

function DaysLeft(date: string): number {
  const dueDate = new Date(date).valueOf()
  const currentDate = new Date().valueOf()
  const diffTime = dueDate - currentDate
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

function GenerateDaysMessage(daysLeft: number, time: string): string {
  if (daysLeft === 0 && time !== '') {
    return `Due today at ${ConvertTimeString(time)}`
  } else if (daysLeft === 0 && time === '') {
    return 'Due today'
  } else if (daysLeft > 0) {
    return `${daysLeft} days left`
  } else if (daysLeft === -1) {
    return `Expired by ${Math.abs(daysLeft)} day`
  } else {
    return `Expired by ${Math.abs(daysLeft)} days`
  }
}

function RecentChecker(date: string): boolean {
  if (DaysLeft(date) > 0 && DaysLeft(date) <= 7) {
    return true
  } else {
    return false
  }
}

function ConvertTimeString(timeString: string): string {
  let [hours, minutes] = timeString.split(':')
  let hour = parseInt(hours)
  const amPm = hour < 12 ? 'AM' : 'PM'
  if (hour === 0) {
    hour = 12
  } else if (hour > 12) {
    hour -= 12
  }

  const stringHour = hour.toString()

  if (minutes.length === 1) {
    minutes = '0' + minutes
  }

  return stringHour + ':' + minutes + ' ' + amPm
}

function GenerateTodoTitle(todoType: string): string {
  switch (todoType) {
    case 'upcoming': {
      return 'Upcoming Tasks'
    }
    case 'today': {
      return "Today's Tasks"
    }
    case 'expired': {
      return 'Overdue Tasks'
    }
    case 'all': {
      return 'All Tasks'
    }
    default: {
      return 'Tasks'
    }
  }
}

function GenerateTodoEmptyText(todoType: string): string {
  switch (todoType) {
    case 'upcoming': {
      return 'No upcoming tasks'
    }
    case 'today': {
      return 'No tasks due today'
    }
    case 'expired': {
      return 'No tasks overdue'
    }
    default: {
      return 'No tasks for now'
    }
  }
}

export {
  AreArraysEqual,
  AreObjectsEqual,
  GenerateDaysMessage,
  RecentChecker,
  DaysLeft,
  ConvertTimeString,
  GenerateTodoTitle,
  GenerateTodoEmptyText,
}

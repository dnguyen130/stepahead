import { ReactElement, useState } from 'react'
import { styled } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import styles from '@/styles/variables/export.module.scss'
import TimePicker from 'react-time-picker'
import DatePicker from 'react-date-picker'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { CreateTodo } from '@/utils/functions'
import { useMyContext } from '@/utils/provider'

const CssTextField = styled(TextField)({
  input: {
    color: styles.bgLight,
  },
  '& label': {
    color: styles.bgLight,
    fontFamily: `"Ubuntu", "Arial", sans-serif`,
  },
  '& label.Mui-focused': {
    color: styles.bgLight,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: styles.bgLight,
    },
    '&:hover fieldset': {
      borderColor: styles.bgLight,
    },
    '&.Mui-focused fieldset': {
      borderColor: styles.bgLight,
    },
  },
})

const CssButton = styled(Button)({
  fontFamily: `"Ubuntu", "Arial", sans-serif`,
  backgroundColor: styles.buttonActiveLight,
})

export const defaultCurrentEventProps = {
  uid: '',
  title: '',
  description: '',
  currentDate: new Date(),
  currentTime: new Date().toLocaleTimeString('en-GB', { timeStyle: 'short' }),
  dueDate: new Date(),
  dueTime: '',
  important: false,
  complete: false,
}

export default function CreateTaskForm(): ReactElement {
  const {
    currentUser,
    setActiveModal,
    todos,
    setTodos,
    currentEvent,
    setCurrentEvent,
  } = useMyContext()
  const [formError, setFormError] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentEvent({ ...currentEvent, important: event.target.checked })
  }

  const ConfirmTodo = async (): Promise<void> => {
    const userId = currentUser.uid
    console.log(currentEvent.uid)

    // Form validation
    if (currentEvent.title === '') {
      setFormError('title')
      alert('Please give your event a name.')
    } else {
      const Key = await CreateTodo({
        uid: currentEvent.uid,
        userId,
        title: currentEvent.title,
        description: currentEvent.description,
        creationDate: currentEvent.currentDate.toDateString(),
        creationTime: currentEvent.currentTime,
        dueDate: currentEvent.dueDate.toDateString(),
        dueTime: currentEvent.dueTime !== null ? currentEvent.dueTime : '',
        important: currentEvent.important,
        complete: false,
      })

      console.log(currentEvent)

      const updatedTodos = todos.map((todo) => {
        if (todo.uid === currentEvent.uid) {
          return {
            ...todo,
            title: currentEvent.title,
            description: currentEvent.description,
            dueDate: currentEvent.dueDate.toDateString(),
            dueTime: currentEvent.dueTime,
            important: currentEvent.important,
          }
        }
        return todo
      })
      // If the created todo does not exist already
      if (!updatedTodos.some((todo) => todo.uid === currentEvent.uid)) {
        setTodos([
          ...todos,
          {
            uid: currentEvent.uid !== '' ? currentEvent.uid : Key,
            userId,
            title: currentEvent.title,
            description: currentEvent.description,
            creationDate: currentEvent.currentDate.toDateString(),
            creationTime: currentEvent.currentTime,
            dueDate: currentEvent.dueDate.toDateString(),
            dueTime: currentEvent.dueTime !== null ? currentEvent.dueTime : '',
            important: currentEvent.important,
            complete: false,
          },
        ])
        alert('Todo Successfully Created')
        // If the todo is being edited
      } else {
        setTodos(updatedTodos)
        alert('Todo Successfully Edited')
      }
      console.log(todos)
      setCurrentEvent(defaultCurrentEventProps)
      setActiveModal('')
    }
  }

  return (
    <div className="createtaskform">
      <CssTextField
        required
        error={formError === 'title'}
        className="createtaskinput"
        label="Title"
        variant="outlined"
        value={currentEvent.title}
        onChange={(newValue) => {
          setCurrentEvent({ ...currentEvent, title: newValue.target.value })
          setFormError('')
        }}
      />
      <CssTextField
        className="createtaskinput"
        label="Short Description"
        variant="outlined"
        value={currentEvent.description}
        onChange={(newValue) => {
          setCurrentEvent({
            ...currentEvent,
            description: newValue.target.value,
          })
        }}
      />
      <div className="datetimecont">
        <h4>Date* and Time</h4>
        <div className="createtaskdatetime">
          <DatePicker
            required
            minDate={new Date()}
            value={currentEvent.dueDate}
            onChange={(newValue: Date) => {
              setCurrentEvent({ ...currentEvent, dueDate: newValue })
            }}
          />
          <TimePicker
            value={currentEvent.dueTime !== null ? currentEvent.dueTime : ''}
            onChange={(newValue: Date | string | null) => {
              setCurrentEvent({
                ...currentEvent,
                dueTime:
                  newValue !== null ? newValue.toLocaleString('en-GB') : '',
              })
            }}
          />
        </div>
      </div>
      <FormControlLabel
        className="createtaskimportant"
        value="important"
        control={
          <Checkbox
            sx={{
              color: styles.bgLight,
              '&.Mui-checked': {
                color: styles.iconActiveLight,
              },
            }}
            onChange={handleChange}
          />
        }
        label="Important"
        labelPlacement="start"
      />
      <div className="createtaskgroup">
        <CssButton
          variant="contained"
          onClick={() => {
            setCurrentEvent(defaultCurrentEventProps)
          }}
          sx={{
            '&: hover': {
              backgroundColor: styles.dangerLight,
            },
          }}
        >
          Reset
        </CssButton>
        <CssButton
          variant="contained"
          onClick={ConfirmTodo}
          sx={{
            '&: hover': {
              backgroundColor: styles.successLight,
            },
          }}
        >
          Confirm
        </CssButton>
      </div>
    </div>
  )
}

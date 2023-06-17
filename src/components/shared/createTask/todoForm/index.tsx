import { ReactElement, useState } from 'react'
import { styled } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import styles from '@/styles/variables/export.module.scss'
import TimePicker from 'react-time-picker'
import DatePicker from 'react-date-picker'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { CreateTodo } from '@/utils/firebasefunctions'
import { useMyContext } from '@/utils/provider'

const CssTextField = styled(TextField)({
  input: {
    fontFamily: `"Ubuntu", "Arial", sans-serif`,
    fontSize: '1em',
    color: styles.bgLight,
  },
  '& label': {
    color: styles.bgLight,
    fontFamily: `"Ubuntu", "Arial", sans-serif`,
    fontWeight: 500,
  },
  '& label.Mui-focused': {
    color: styles.iconActiveLight,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: styles.bgLight,
    },
    '&:hover fieldset': {
      borderColor: styles.bgLight,
    },
    '&.Mui-focused fieldset': {
      borderColor: styles.iconActiveLight,
    },
  },
})

const CssButton = styled(Button)({
  fontFamily: `"Ubuntu", "Arial", sans-serif`,
  backgroundColor: styles.buttonActiveLight,
})

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

  const [focus, setFocus] = useState('')

  const defaultCurrentEventProps = {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentEvent({ ...currentEvent, important: event.target.checked })
  }

  const ConfirmTodo = async (): Promise<void> => {
    const userId = currentUser.uid

    // Form validation
    if (currentEvent.title === '') {
      setFormError('title')
      alert('Please give your event a name.')
    } else if (currentEvent.dueDate === null) {
      setFormError('date')
      alert('Missing Due Date')
    } else {
      const Key = await CreateTodo({
        uid: currentEvent.uid !== '' ? currentEvent.uid : '',
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
      const updatedTodos = todos.map((todo) => {
        // If editing, update everything but UID
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
      console.log(todos, updatedTodos, currentEvent)
      // If the created todo does not exist already
      console.log(!updatedTodos.some((todo) => todo.uid === currentEvent.uid))
      if (!updatedTodos.some((todo) => todo.uid === currentEvent.uid)) {
        setTodos([
          ...todos,
          {
            uid: Key,
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
        label="Short Description (Optional)"
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
        <h4 className={focus !== '' ? 'dateheaderactive' : 'dateheader'}>
          Date* and Time
        </h4>
        <div className="createtaskdatetime">
          <DatePicker
            onCalendarOpen={() => {
              setFocus('calendar')
            }}
            onCalendarClose={() => {
              setFocus('')
            }}
            required
            minDate={new Date()}
            value={currentEvent.dueDate}
            onChange={(newValue: Date) => {
              setCurrentEvent({ ...currentEvent, dueDate: newValue })
            }}
            className={focus === 'calendar' ? 'activedateborder' : 'dateborder'}
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

import { ReactElement, useState } from 'react'
import { styled } from '@mui/material'
import TextField from '@mui/material/TextField'
import styles from '@/styles/variables/export.module.scss'
import TimePicker from 'react-time-picker'
import DatePicker from 'react-date-picker'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { CreateTodo } from '@/utils/functions'
import { v4 as uuidv4 } from 'uuid'
import { useMyContext } from '@/utils/provider'
interface CurrentEventProps {
  title: string
  description: string
  currentDate: Date
  currentTime: string
  dueDate: Date
  dueTime: string | null
  important: boolean
  complete: boolean
}

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

export default function CreateTaskForm(): ReactElement {
  const { currentUser, setActiveModal, todos, setTodos } = useMyContext()

  const defaultCurrentEventProps = {
    title: '',
    description: '',
    currentDate: new Date(),
    currentTime: new Date().toLocaleTimeString('en-GB', { timeStyle: 'short' }),
    dueDate: new Date(),
    dueTime: '',
    important: false,
    complete: false,
  }

  const [currentEvent, setCurrentEvent] = useState<CurrentEventProps>(
    defaultCurrentEventProps
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentEvent({ ...currentEvent, important: event.target.checked })
  }

  const ConfirmTodo = async (): Promise<void> => {
    const uid = uuidv4()
    const userId = currentUser.uid
    try {
      await CreateTodo({
        uid,
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
      setTodos([
        ...todos,
        {
          uid,
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
      setActiveModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="createtaskform">
      <CssTextField
        required
        className="createtaskinput"
        label="Title"
        variant="outlined"
        value={currentEvent.title}
        onChange={(newValue) => {
          setCurrentEvent({ ...currentEvent, title: newValue.target.value })
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
      <div className="createtaskrow">
        <h4>Date and Time</h4>
        <div className="createtaskdatetime">
          <DatePicker
            required
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
                  newValue !== null ? newValue.toLocaleString('en-GB') : null,
              })
            }}
          />
        </div>
      </div>
      <FormControlLabel
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
      <div className="createtaskgroup half">
        <button
          onClick={() => {
            setCurrentEvent(defaultCurrentEventProps)
          }}
        >
          Reset
        </button>
        <button onClick={ConfirmTodo}>Confirm</button>
      </div>
    </div>
  )
}

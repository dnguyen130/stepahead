import { ReactElement, useState } from 'react'
import { styled } from '@mui/material'
import TextField from '@mui/material/TextField'
import styles from '@/styles/variables/export.module.scss'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css'

interface CurrentEventProps {
  title: string
  description: string
  currentDate: Date
  dueDate: Date
  important: boolean
  complete: boolean
}

const CssTextField = styled(TextField)({
  input: {
    color: styles.bgLight,
  },
  '& label': {
    color: styles.bgLight,
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
  const [currentEvent, setCurrentEvent] = useState<CurrentEventProps>({
    title: '',
    description: '',
    currentDate: new Date(),
    dueDate: new Date(),
    important: false,
    complete: false,
  })

  return (
    <div className="createtaskform">
      <CssTextField
        className="createtaskinput"
        label="Title"
        variant="outlined"
        value={currentEvent.title}
        onChange={(newValue) => {
          setCurrentEvent({ ...currentEvent, title: newValue.target.value })
          console.log(currentEvent)
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
      <DateTimePicker
        className="createtaskdatetime"
        disableClock={true}
        minDate={new Date()}
        value={currentEvent.dueDate}
        onChange={(newValue) => {
          setCurrentEvent({ ...currentEvent, dueDate: newValue })
          console.log(currentEvent)
        }}
      />
      <div>
        <label className="createtasklabel">Important</label>
        <input type="checkbox" />
      </div>
      <div className="createtaskgroup half">
        <button>Reset</button>
        <button>Confirm</button>
      </div>
    </div>
  )
}

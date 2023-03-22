import { ReactElement, useState } from 'react'
import { styled } from '@mui/material'
import TextField from '@mui/material/TextField'
import styles from '@/styles/variables/export.module.scss'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
interface CurrentEventProps {
  title: string
  description: string
  currentDate: Date
  dueDate: Date | null
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
  const [currentEvent, setCurrentEvent] = useState<CurrentEventProps>({
    title: '',
    description: '',
    currentDate: new Date(),
    dueDate: new Date(),
    important: false,
    complete: false,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentEvent({ ...currentEvent, important: event.target.checked })
    console.log(currentEvent)
  }

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
      <div className="createtaskrow">
        <h4>Date and Time</h4>
        <DateTimePicker
          className="createtaskdatetime"
          disableClock
          minDate={new Date()}
          value={currentEvent.dueDate}
          onChange={(newValue) => {
            try {
              setCurrentEvent({ ...currentEvent, dueDate: newValue })
              console.log(currentEvent)
            } catch (error) {
              console.log(error)
            }
          }}
        />
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
        <button>Reset</button>
        <button>Confirm</button>
      </div>
    </div>
  )
}

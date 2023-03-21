import { ReactElement, useState } from 'react'
import { styled } from '@mui/material'
import TextField from '@mui/material/TextField'
import styles from '@/styles/variables/export.module.scss'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

interface CurrentEventProps {
  title: string
  description: string
  currentDate: string
  dueDate?: string
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

const CssDateTimePicker = styled(DateTimePicker)({
  input: {
    color: styles.bgLight,
  },
  '& label': {
    color: styles.bgLight,
  },
  '& label.Mui-focused': {
    color: styles.bgLight,
  },
  '& fieldset': {
    borderColor: styles.bgLight,
  },
  '&:hover fieldset': {
    borderColor: styles.bgLight,
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: styles.bgLight,
    },
  },
})

export default function CreateTaskForm(): ReactElement {
  const [currentEvent, setCurrentEvent] = useState<CurrentEventProps>({
    title: '',
    description: '',
    currentDate: '',
    dueDate: '',
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
          console.log(currentEvent)
        }}
      />
      <div className="createtaskrow">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssDateTimePicker
            className="createtaskdatetime"
            label="Date & Time"
            onChange={(newValue) => {
              if (newValue !== (null ?? undefined)) {
                console.log(newValue.$D)
              }
            }}
          />
        </LocalizationProvider>
      </div>
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

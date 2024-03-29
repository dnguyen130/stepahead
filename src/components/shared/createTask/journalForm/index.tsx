import { ReactElement, useState } from 'react'
import { styled } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import styles from '@/styles/variables/export.module.scss'
import { CreateJournal } from '@/utils/firebasefunctions'
import { useMyContext } from '@/utils/provider'

const CssTextField = styled(TextField)({
  input: {
    fontFamily: `"Ubuntu", "Arial", sans-serif`,
    fontSize: '1em',
    color: styles.bgLight,
  },
  textarea: {
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

export default function CreateJournalForm(): ReactElement {
  const {
    currentUser,
    setActiveModal,
    journals,
    setJournals,
    currentJournal,
    setCurrentJournal,
  } = useMyContext()
  const [formError, setFormError] = useState('')

  const defaultJournalProps = {
    uid: currentJournal.uid !== '' ? currentJournal.uid : '',
    title: '',
    content: '',
    currentDate: new Date(),
    currentTime: new Date().toLocaleTimeString('en-GB', { timeStyle: 'short' }),
  }

  const ConfirmJournal = async (): Promise<void> => {
    const userId = currentUser.uid

    // Form validation
    if (currentJournal.title === '') {
      setFormError('title')
      alert('Please give your event a name.')
    } else {
      const Key = await CreateJournal({
        uid: currentJournal.uid,
        userId,
        title: currentJournal.title,
        content: currentJournal.content,
        creationDate: currentJournal.currentDate.toDateString(),
        creationTime: currentJournal.currentTime,
      })

      const updatedJournals = journals.map((journal) => {
        if (journal.uid === currentJournal.uid) {
          return {
            ...journal,
            title: currentJournal.title,
            content: currentJournal.content,
          }
        }
        return journal
      })
      // If the created todo does not exist already

      if (
        !updatedJournals.some((journal) => journal.uid === currentJournal.uid)
      ) {
        setJournals([
          ...journals,
          {
            uid: currentJournal.uid !== '' ? currentJournal.uid : Key,
            userId,
            title: currentJournal.title,
            content: currentJournal.content,
            creationDate: currentJournal.currentDate.toDateString(),
            creationTime: currentJournal.currentTime,
          },
        ])
        alert('Journal Entry Successfully Created')
        // If the todo is being edited
      } else {
        setJournals(updatedJournals)
        alert('Journal Entry Successfully Edited')
      }
      setCurrentJournal(defaultJournalProps)
      setActiveModal('')
    }
  }

  return (
    <div className="createjournalform">
      <CssTextField
        required
        error={formError === 'title'}
        className="createtaskinput"
        label="Title"
        variant="outlined"
        value={currentJournal.title}
        onChange={(newValue) => {
          setCurrentJournal({ ...currentJournal, title: newValue.target.value })
          setFormError('')
        }}
      />
      <CssTextField
        className="createtaskinput"
        multiline
        minRows={8}
        label="Content*"
        variant="outlined"
        value={currentJournal.content}
        onChange={(newValue) => {
          setCurrentJournal({
            ...currentJournal,
            content: newValue.target.value,
          })
        }}
      />
      <div className="createtaskgroup">
        <CssButton
          variant="contained"
          onClick={() => {
            setCurrentJournal(defaultJournalProps)
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
          onClick={ConfirmJournal}
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

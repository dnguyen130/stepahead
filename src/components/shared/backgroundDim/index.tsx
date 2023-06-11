import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'

export default function BackgroundDim(): ReactElement {
  const {
    activeModal,
    setActiveModal,
    currentEvent,
    setCurrentEvent,
    currentJournal,
    setCurrentJournal,
  } = useMyContext()

  const defaultCurrentEventProps = {
    uid: currentEvent.uid !== '' ? currentEvent.uid : '',
    title: '',
    description: '',
    currentDate: new Date(),
    currentTime: new Date().toLocaleTimeString('en-GB', { timeStyle: 'short' }),
    dueDate: new Date(),
    dueTime: '',
    important: false,
    complete: false,
  }

  const defaultJournalProps = {
    uid: currentJournal.uid !== '' ? currentJournal.uid : '',
    title: '',
    content: '',
    currentDate: new Date(),
    currentTime: new Date().toLocaleTimeString('en-GB', { timeStyle: 'short' }),
  }

  return (
    <div
      className="backgrounddim"
      style={{
        opacity: activeModal !== '' ? 0.3 : 0,
        pointerEvents: activeModal !== '' ? 'auto' : 'none',
      }}
      onClick={() => {
        setActiveModal('')
        setCurrentEvent(defaultCurrentEventProps)
        setCurrentJournal(defaultJournalProps)
      }}
    />
  )
}

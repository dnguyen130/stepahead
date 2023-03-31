import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'

export default function BackgroundDim(): ReactElement {
  const { activeModal, setActiveModal } = useMyContext()
  return (
    <div
      className="backgrounddim"
      style={{
        opacity: activeModal !== '' ? 0.3 : 0,
        pointerEvents: activeModal !== '' ? 'auto' : 'none',
      }}
      onClick={() => {
        setActiveModal('')
      }}
    />
  )
}

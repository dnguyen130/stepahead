import { FunctionComponent, useState } from 'react'
import { useTheme } from '../../../utils/provider'

export const AddButtonMobile: FunctionComponent = ({}) => {
  const { theme } = useTheme()

  return (
    <button className={`addbuttonmobile-${theme}`}>
      <div className={`addiconmobile-${theme}`}>+</div>
    </button>
  )
}

import { FunctionComponent, useState } from 'react'
import { useTheme } from '../../../utils/provider'

export const AddButtonDesktop: FunctionComponent = ({}) => {
  const { theme } = useTheme()

  return (
    <button className={`addbuttondesktop-${theme}`}>
      <div className={`addicondesktop-${theme}`}>+</div>
    </button>
  )
}

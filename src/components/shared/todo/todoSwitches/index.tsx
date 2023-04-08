import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const filterCategories = ['all', 'expired', 'today', 'upcoming']

export default function TodoSwitches(): ReactElement {
  const { taskFilter, setTaskFilter } = useMyContext()

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: string
  ): void => {
    console.log(taskFilter)
    if (newFilter !== null) {
      setTaskFilter(newFilter)
    }
  }

  return (
    <div className="todoSwitchcont">
      <ToggleButtonGroup
        exclusive
        value={taskFilter}
        onChange={handleChange}
        className="tasktogglegroup"
      >
        {filterCategories.map((filterType) => {
          return (
            <ToggleButton
              key={filterType}
              value={filterType}
              sx={{
                fontWeight: 600,
              }}
            >
              {filterType}
            </ToggleButton>
          )
        })}
      </ToggleButtonGroup>
    </div>
  )
}

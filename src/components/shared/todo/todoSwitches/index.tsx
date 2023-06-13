import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const filterCategories = ['all', 'expired', 'upcoming', 'complete']

export default function TodoSwitches(): ReactElement {
  const { taskFilter, setTaskFilter } = useMyContext()

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: string
  ): void => {
    if (newFilter !== null) {
      setTaskFilter(newFilter)
    }
  }

  return (
    <div className="todoSwitchcont">
      <ToggleButtonGroup
        exclusive
        size="small"
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

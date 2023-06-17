import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const filterRow1 = ['all', 'expired', 'upcoming']
const filterRow2 = ['today', 'complete']

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
        {filterRow1.map((filterType) => {
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
      <ToggleButtonGroup
        exclusive
        size="small"
        value={taskFilter}
        onChange={handleChange}
        className="tasktogglegroup"
      >
        {filterRow2.map((filterType) => {
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

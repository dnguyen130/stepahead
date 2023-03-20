import { ReactElement } from 'react'
import { useMyContext } from '@/utils/provider'

export default function CreateTaskForm(): ReactElement {
  const { todos, setTodos } = useMyContext()

  return (
    <div className="createtaskform">
      <div className="createtaskrow">
        <label className="createtasklabel">Title</label>
        <input className="createtaskinput" />
      </div>
      <div className="createtaskrow">
        <label className="createtasklabel">Description</label>
        <input />
      </div>
      <div className="createtaskgroup">
        <div>
          <label className="createtasklabel">Due Date</label>
          <input type="date" />
        </div>
        <div>
          <label className="createtasklabel">Important</label>
          <input type="checkbox" />
        </div>
      </div>
      <div className="createtaskgroup half">
        <button>Reset</button>
        <button>Confirm</button>
      </div>
    </div>
  )
}

import { ChangeEvent, FunctionComponent, KeyboardEvent, useRef } from "react"
import { Todo } from "./types"

type Props = {
  todo: Todo
  focused?: boolean
  updateTodo: (todo: Todo) => void
  deleteTodo: (id: string) => void
  onSubmit: () => void
}

const TodoItem: FunctionComponent<Props> = ({
  focused,
  todo,
  updateTodo,
  onSubmit,
  deleteTodo,
}) => {
  const textInputRef = useRef<HTMLInputElement>(null)

  const toggleChecked = () => {
    updateTodo({ ...todo, checked: !todo.checked })
  }

  const updateLabel = (event: ChangeEvent<HTMLInputElement>) => {
    updateTodo({ ...todo, label: event.currentTarget.value })
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit()
    }
  }

  return (
    <div className="todo">
      <input type="checkbox" checked={todo.checked} onChange={toggleChecked} />
      <input
        autoFocus={focused}
        ref={textInputRef}
        type="text"
        defaultValue={todo.label}
        onChange={updateLabel}
        onKeyDown={onKeyDown}
      />
      <button onClick={() => deleteTodo(todo.id)} aria-label="Delete this task">
        &times;
      </button>
    </div>
  )
}

export default TodoItem

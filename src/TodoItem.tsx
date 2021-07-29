import {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  useRef,
  useState,
} from "react"
import { Todo } from "./types"
import cx from "classnames"

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
  const textInputRef = useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  const toggleChecked = () => {
    updateTodo({ ...todo, checked: !todo.checked })
  }

  const updateLabel = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateTodo({ ...todo, label: event.currentTarget.value })
  }

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      onSubmit()
    }
  }

  const takeFocus = () => {
    setIsFocused(true)
  }

  const loseFocus = () => {
    setIsFocused(false)
  }

  return (
    <div className={cx("task", { "task--checked": todo.checked })}>
      <label className="task__checkbox-container">
        <input
          aria-labelledby={`task_${todo.id}_label`}
          className="task__checkbox"
          type="checkbox"
          checked={todo.checked}
          onChange={toggleChecked}
        />
      </label>
      <div className="task__text-autogrow" data-replicated-value={todo.label}>
        <textarea
          id={`task_${todo.id}_label`}
          className="task__text-input"
          autoFocus={focused}
          ref={textInputRef}
          rows={1}
          defaultValue={todo.label}
          onChange={updateLabel}
          onKeyDown={onKeyDown}
          onFocus={takeFocus}
          onBlur={loseFocus}
        />
      </div>
      <div>
        <button
          className="task__delete-button"
          onClick={() => deleteTodo(todo.id)}
          aria-label="Delete this task"
          style={{ opacity: isFocused ? 1 : 0 }}
        >
          &times;
        </button>
      </div>
    </div>
  )
}

export default TodoItem

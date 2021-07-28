import { FunctionComponent, useRef } from "react"

type Props = {
  label: string
}

const TodoItem: FunctionComponent<Props> = ({ label }) => {
  const textInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="todo">
      <input type="checkbox" />
      <input ref={textInputRef} type="text" defaultValue={label} />
    </div>
  )
}

export default TodoItem

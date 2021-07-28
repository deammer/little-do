import { useState } from "react"
import "./App.css"
import TodoItem from "./TodoItem"
import { nanoid } from "nanoid"

type Todo = {
  label: string
  uuid: string
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const createTodo = () => {
    const newTodo: Todo = {
      label: "",
      uuid: nanoid(),
    }

    setTodos([...todos, newTodo])
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Little Do</h1>
      </header>
      <main>
        {todos.map((item) => (
          <TodoItem key={item.uuid} {...item} />
        ))}
      </main>
      <footer>
        <button onClick={createTodo}>Add todo</button>
      </footer>
    </div>
  )
}

export default App

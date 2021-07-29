import { useEffect, useState } from "react"
import "./App.css"
import TodoItem from "./TodoItem"
import { nanoid } from "nanoid"
import { set, get } from "idb-keyval"
import { Category, Todo } from "./types"

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [focusedTodo, setFocusedTodo] = useState<string>()

  useEffect(function loadTodos() {
    get<Todo[]>("todos").then((data) => {
      if (data) {
        console.log(data)
        setTodos(data)
      }
    })
  }, [])

  const createTodo = () => {
    const newItemId = nanoid()
    const newTodo: Todo = {
      label: "",
      id: newItemId,
      checked: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      category: Category.Today,
    }

    setFocusedTodo(newItemId)
    setTodos([...todos, newTodo])
    set("todos", [...todos, newTodo])
  }

  const updateTodo = (updatedTodo: Todo) => {
    const index = todos.findIndex((todo) => todo.id === updatedTodo.id)

    if (index >= 0) {
      const updatedTodos = [...todos]
      updatedTodos[index] = updatedTodo
      updatedTodos[index].updatedAt = Date.now()

      setTodos(updatedTodos)
      set("todos", updatedTodos)
    }
  }

  const deleteTodo = (todoId: string) => {
    const updatedTodos = todos.filter((task) => task.id !== todoId)
    setTodos(updatedTodos)
    set("todos", updatedTodos)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Little Do</h1>
      </header>
      <main>
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            todo={item}
            updateTodo={updateTodo}
            onSubmit={createTodo}
            focused={focusedTodo === item.id}
            deleteTodo={deleteTodo}
          />
        ))}
      </main>
      <footer>
        <button className="new-todo-button" onClick={createTodo}>
          + Add task
        </button>
      </footer>
    </div>
  )
}

export default App

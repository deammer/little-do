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
    const deletedTodoIndex = todos.findIndex((task) => task.id === todoId)
    const updatedTodos = todos.filter((task) => task.id !== todoId)
    setTodos(updatedTodos)
    set("todos", updatedTodos)

    // Select the task either before or after the deleted one
    const newIndex = deletedTodoIndex > 0 ? deletedTodoIndex - 1 : 0
    setFocusedTodo(todos[newIndex].id)
  }

  const goToPreviousTask = (todoId: string) => {
    const currentTaskIndex = todos.findIndex((task) => task.id === todoId)
    if (currentTaskIndex > 0) {
      setFocusedTodo(todos[currentTaskIndex - 1].id)
    }
  }

  const goToNextTask = (todoId: string) => {
    const currentTaskIndex = todos.findIndex((task) => task.id === todoId)
    if (currentTaskIndex < todos.length - 1) {
      setFocusedTodo(todos[currentTaskIndex + 1].id)
    } else {
      createTodo()
    }
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">Today</h1>
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
            goToPreviousTask={goToPreviousTask}
            goToNextTask={goToNextTask}
          />
        ))}
      </main>
      <footer>
        <button className="add-task-button" onClick={createTodo}>
          <span className="add-task-button__icon">+</span> Add task
        </button>
      </footer>
    </div>
  )
}

export default App

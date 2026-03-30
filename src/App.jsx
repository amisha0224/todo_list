import { useState } from 'react'
import './App.css'

const initialTasks = [
  { id: 1, title: 'Buy groceries', completed: true },
  { id: 2, title: 'Finish project report', completed: false },
  { id: 3, title: 'Call the dentist', completed: false },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingValue, setEditingValue] = useState('')

  const addTask = (event) => {
    event.preventDefault()
    const title = newTask.trim()

    if (!title) {
      return
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        title,
        completed: false,
      },
    ])
    setNewTask('')
  }

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const startEditing = (task) => {
    setEditingId(task.id)
    setEditingValue(task.title)
  }

  const saveTask = (taskId) => {
    const title = editingValue.trim()

    if (!title) {
      return
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, title } : task)),
    )
    setEditingId(null)
    setEditingValue('')
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingValue('')
  }

  const deleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))

    if (editingId === taskId) {
      cancelEditing()
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>My To-Do List</h1>
      </header>

      <main className="todo-card">
        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            aria-label="Add a new task"
          />
          <button type="submit">Add Task</button>
        </form>

        <section className="task-list" aria-label="Todo items">
          {tasks.length === 0 ? (
            <p className="empty-state">No tasks yet. Add one to get started.</p>
          ) : (
            tasks.map((task) => {
              const isEditing = editingId === task.id

              return (
                <article className="task-row" key={task.id}>
                  <label className="task-main">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      aria-label={`Mark ${task.title} as ${
                        task.completed ? 'pending' : 'completed'
                      }`}
                    />

                    {isEditing ? (
                      <input
                        className="edit-input"
                        type="text"
                        value={editingValue}
                        onChange={(event) => setEditingValue(event.target.value)}
                        aria-label={`Edit ${task.title}`}
                        autoFocus
                      />
                    ) : (
                      <span className={task.completed ? 'task-title done' : 'task-title'}>
                        {task.title}
                      </span>
                    )}
                  </label>

                  <div className="task-actions">
                    <span className={task.completed ? 'status completed' : 'status pending'}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </span>

                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          className="secondary-btn"
                          onClick={() => saveTask(task.id)}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="ghost-btn"
                          onClick={cancelEditing}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="secondary-btn"
                        onClick={() => startEditing(task)}
                      >
                        Edit
                      </button>
                    )}

                    <button
                      type="button"
                      className="danger-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              )
            })
          )}
        </section>
      </main>

      <footer className="footer">
        Simple CRUD to-do app built with React
      </footer>
    </div>
  )
}

export default App

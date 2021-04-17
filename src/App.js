import React, {useEffect} from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
// import AddTodo from './Todo/AddTodo' // Закомментируем для Lazy loading от основного bundle
import Loader from './Loader'
import Modal from './Modal/Modal'

// Lazy loading списка от основного bundle
// const AddTodo = React.lazy(() => import('./Todo/AddTodo'))
// Создадим искуственную задержку для демонстрации
const AddTodo = React.lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('./Todo/AddTodo'))
      }, 3000)
    })
)

function App() {
  // Зададим в useState начальное состояние значений. Возвращает всегда два значения в массиве, первое - это дефолтное состояние, заданное сейчас, а второй элемент - коллбэк
  // const [todos, setTodos] = React.useState([
  //   {id: 1, completed: false, title: 'Купить хлеб'},
  //   {id: 2, completed: true, title: 'Купить масло'},
  //   {id: 3, completed: false, title: 'Купить молоко'},
  // ])

  // Так как значения получаем в useEffect, в useState передаём пустой массив, так как todos массив
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true) // Изначальное значение loading = true

  // После построения DOM делаем запрос. Для отслеживания этого момента используется useEffect
  useEffect(() => {
    // Использовать fetch при наличии доступа в интернет
    // fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    // .then(response => response.json())
    // then(todos => {
    //   // Иммитация задержки
    //   setTimeout(() => {
    //     setTodos(todos)
    //   }, 2000)
    // })

    const response = [
      {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      },
      {
        userId: 2,
        id: 2,
        title: 'delectus aut autem2',
        completed: false,
      },
      {
        userId: 3,
        id: 3,
        title: 'delectus aut autem3',
        completed: false,
      },
      {
        userId: 4,
        id: 4,
        title: 'delectus aut autem4',
        completed: true,
      },
      {
        userId: 5,
        id: 5,
        title: 'delectus aut autem5',
        completed: false,
      },
    ]

    // Иммитация задержки
    setTimeout(() => {
      setTodos(response)
      setLoading(false)
    }, 2000)
  }, [])

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) todo.completed = !todo.completed
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    )
  }

  return (
    <Context.Provider value={{removeTodo}}>
      <div className="wrapper">
        <h1>React tutorial</h1>
        <Modal />
        {/* Loading... будет отображаться, пок грузится Lazy loading */}
        <React.Suspense fallback={<Loader />}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No todos!</p>
        )}
      </div>
    </Context.Provider>
  )
}

export default App

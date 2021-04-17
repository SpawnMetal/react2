// Файл с компонентой
import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

const styles = {
  ul: {
    listStyle: 'none', // Стили взаимодействующие с реактом описываются в camelCase, если слово содержите дефис
    margin: 0,
    padding: 0,
  },
}

function TodoList(props) {
  return (
    <ul style={styles.ul}>
      {props.todos.map((todo, index) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id} // Для каждого итерируемого объекта в реакте устанавливается уникальное значение key
            index={index}
            onChange={props.onToggle}
          />
        )
      })}
    </ul>
  )
}

// Определяем свойство для описания объектов
// Хорошей практикой считается описание входящих свойств в нужный компонент, чтобы избегать потенциальных ошибок с передачей типов значений
// Для этого используется npm i prop-types
TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired, // Массив объектов, необходимый для работы компонента (isRequired)
  onToggle: PropTypes.func.isRequired,
}

export default TodoList

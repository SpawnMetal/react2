import React, {useState} from 'react'
import PropTypes from 'prop-types'

function useInputValue(defaultValue = '') {
  const [value, setValue] = useState(defaultValue)

  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value),
    },
    clear: () => setValue(''),
    value: () => value,
  }
}

function AddTodo({onCreate}) {
  const input = useInputValue('')

  function submitHandler(event) {
    event.preventDefault() // Для отмены перезагрузки страницы

    if (input.value().trim()) {
      onCreate(input.value())
      input.clear()
    }
  }

  return (
    <form style={{marginBottom: '1rem'}} onSubmit={submitHandler}>
      {/* <input value={value} onChange={event => setValue(event.target.value)} /> */}
      <input {...input.bind} />{' '}
      {/* Получит оба параметра возвращаемых функцией useInputValue */}
      <button type="submit">Add todo</button>
    </form>
  )
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
}

export default AddTodo

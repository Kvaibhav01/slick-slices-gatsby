import { useState } from 'react'

//? This is a custom hook
export default function useForm(defaults) {
  const [values, setValues] = useState(defaults)

  function updateValue(e) {
    // Check if it's a number, then convert
    let { value } = e.target
    if (e.target.type === 'number') {
      value = parseInt(value)
    }

    setValues({
      // Copy existing values
      ...values,
      // Update the new value that changes
      [e.target.name]: e.target.value
    })
  }

  return { values, updateValue }
}
// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, defaultValue = '') {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem(key) || initialName
  const [state, setState] = React.useState(() => {
    // lazy initialization to avoid a performance bottleneck of reading into localStorage on every render.
    const valueInLocalStorage = window.localStorage.getItem(key);
    
    try {
      return valueInLocalStorage ? JSON.parse(window.localStorage.getItem(key)) : defaultValue;
    } catch (e) {

    }
    return defaultValue;
  })

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem(key, name)
  React.useEffect(
    () => {
      // your side-effect code here.
      // this is where you can make HTTP requests or interact with browser APIs.
      window.localStorage.setItem(key, JSON.stringify(state))
    },
    [key, state] /* dependency array */,
  )

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App

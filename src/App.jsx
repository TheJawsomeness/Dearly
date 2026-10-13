import { useEffect, useState } from 'react'
import Button from './components/button'
import AuthForm from './components/authForm'
import AccountDisplay from './components/accountDisplay'

import { getCounter, incrementCounter, listenToCounter } from './backend/services/counterService'
import { logIn, signUp, getCurrentUser, logOut } from './backend/services/authService'

function App() {
  const [count, setCount] = useState(0)
  const [currentUser, setCurrentUser] = useState(null)

  function loadCounter(){
    getCounter().then(setCount)
    .catch((error) => console.error('Failed to load counter:', error))
  }

  function watchCounter() {
    return listenToCounter(setCount)
  }

  function handleCounterIncrement(){
    console.log("clicked")
    // INCREMENT LOCALLY FOR RESPONSIVENESS
    let visualCount = count
    visualCount += 1
    setCount(visualCount)

    incrementCounter().catch((error)=>
      console.error('failed to increment counter:',error)
    )
  }

  async function handleLogin(email,password){
    const data = await logIn(email,password)
    setCurrentUser(data.user)
    console.log("LOGIN", data.user)
    return true
  }

  async function handleRegister(email,password){
    signUp(email,password)
    console.log("Register")
  }

  async function handleLogOut() {
    await logOut()
    setCurrentUser(null)
  }

  function loadUser(user){
    getCurrentUser().then(setCurrentUser)
    .catch((error) => console.error('Failed to retrieve user:', error))

    getCurrentUser().then((user) => console.log(user))
  }
  
  useEffect(loadCounter,[])
  useEffect(watchCounter, [])
  useEffect(loadUser,[])

  return(
    <>
      <AccountDisplay user={currentUser} onLogOut={handleLogOut}/>
      <hr/>
      <Button onClick={handleCounterIncrement}> Count: {count} </Button>
      <hr/>
      <AuthForm onLogin={handleLogin} onRegister={handleRegister}></AuthForm>
    </>
  )
}

export default App

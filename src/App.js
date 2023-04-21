import React, { Suspense, useEffect, useState, createContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './Components/NavBar/NavBar'
import { useRoutes } from 'react-router-dom'
import PubSub from 'pubsub-js'
import routes from './routes/routes.js'
import './app.css'

export const ThemeContext = createContext() 

export default function App() {

  const element = useRoutes(routes)

  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    let getTheme = function (_, data) {
      setTheme(data)
    }
    PubSub.subscribe('theme', getTheme)
  },[])

  useEffect(() => {
    document.body.className = theme
  },[theme])

  return (
    <div className={`app ${theme}`}>
      <ThemeContext.Provider value={theme}>
        <Suspense fallback={<h1>page loading...</h1>}>
          {element}
        </Suspense>
        <NavBar />
      </ThemeContext.Provider>
    </div>
  )
}


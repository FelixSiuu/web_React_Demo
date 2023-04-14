import React, {Suspense} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar/NavBar'

import {useRoutes} from 'react-router-dom'
import routes from './routes/routes.js'
import './App.css';

export default function App() {
  const element = useRoutes(routes)
  return (
    <div>
      <Suspense fallback={<h1>page loading...</h1>}>
        {element}
      </Suspense>
      <NavBar />
    </div>
  )
}


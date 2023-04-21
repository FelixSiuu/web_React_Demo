import { lazy } from 'react'
import { Navigate } from 'react-router'
const Search = lazy(() => import('../Pages/Search/Search'))
const Todo = lazy(() => import('../Pages/Todo/Todo'))

const routes = [
  {path: '/', element: <Navigate to='/search'/>},
  {path: '/home', element: <Navigate to='/search'/>},
  {path: '/search', element: <Search/>},
  {path: '/todo', element: <Todo/>}
]

export default routes
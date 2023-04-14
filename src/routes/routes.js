import { Navigate } from 'react-router';
import Search from '../Pages/Search/Search';
import Todo from '../Pages/Todo/Todo';

const routes = [
  {path: '/', element: <Navigate to='/search'/>},
  {path: '/search', element: <Search/>},
  {path: '/todo', element: <Todo/>}
]

export default routes
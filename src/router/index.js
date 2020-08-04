import { renderRoutes } from 'react-router-config'
import loadable from 'react-loadable'
import Loading from '../components/loading'

const loadComponent = loader => {
  return loadable({
    loader,
    loading: Loading
  })
}

const routes = [
  {
    path: '/',
    exact: true,
    component: loadComponent(() => import('../view/home/index'))
  },
  {
    path: '/list',
    component: loadComponent(() => import('../view/List/index'))
  }
]

export default function Router () {
  return renderRoutes(routes)
}
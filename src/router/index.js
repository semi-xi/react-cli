import { renderRoutes } from 'react-router-config'
import loadable from 'react-loadable'
import Loading from '../components/loading'

const loadableComponent = loader => {
  return loadable({
    loader,
    loading: Loading
  });
};

const routes = [
  {
    path: '/',
    exact: true,
    component: loadableComponent(() => import('../view/home'))
  },
  {
    path: '/list',
    component: loadableComponent(() => import('../view/order/list'))
  }
]


// export default routes
export default function Router () {
  return renderRoutes(routes)
}
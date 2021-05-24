import { FC } from 'react'
import Critters from 'components/pages/Critters'

interface Route {
  path: string
  component: FC<any>
  exact?: boolean
}

export const routes: Route[] = [
  // 404 route, must be last
  {
    path: '*',
    component: Critters,
  },
]

export default routes

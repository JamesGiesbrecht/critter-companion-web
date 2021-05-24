import { FC } from 'react'
import Critters from 'containers/Critters/Critters'

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
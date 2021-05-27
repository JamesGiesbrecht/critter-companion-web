import { FC } from 'react'
import Critters from 'components/critters/Critters'

interface Route {
  path: string
  component: FC<any>
  exact?: boolean
}

export const routes: Route[] = [
  {
    path: '*',
    component: Critters,
  },
]

export default routes

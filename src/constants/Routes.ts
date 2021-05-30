import { FC } from 'react'
import Critters from 'components/critters/Critters'
import Account from 'components/account/Account'

interface Route {
  path: string
  component: FC<any>
  exact?: boolean
}

export const routes: Route[] = [
  {
    path: '/account',
    component: Account,
  },
  {
    path: '*',
    component: Critters,
  },
]

export default routes

import { FC } from 'react'
import Critters from 'components/critters/Critters'
import Account from 'components/account/Account'

interface Route {
  path: string
  component: FC<any>
  exact?: boolean
}

interface AppRoutes {
  [name: string]: Route
}

export const Routes: AppRoutes = {
  account: {
    path: '/account',
    component: Account,
  },
  home: {
    path: '*',
    component: Critters,
  },
}

export default Routes

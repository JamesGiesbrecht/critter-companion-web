import { FC } from 'react'

import { ReactComponent as BlathersLogo } from 'assets/images/blathersLogo.svg'

import { SvgIcon, SvgIconProps } from '@material-ui/core'

const BlathersIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <BlathersLogo />
  </SvgIcon>
)

export default BlathersIcon

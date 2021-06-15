import { FC } from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'
import { ReactComponent as BlathersLogo } from 'assets/images/blathersLogo.svg'

const BlathersIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <BlathersLogo />
  </SvgIcon>
)

export default BlathersIcon

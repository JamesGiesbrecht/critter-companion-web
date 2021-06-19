import { FC } from 'react'

import { ReactComponent as GoogleLogo } from 'assets/images/googleLogo.svg'

import { SvgIcon, SvgIconProps } from '@material-ui/core'

const GoogleIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <GoogleLogo />
  </SvgIcon>
)

export default GoogleIcon

import { SvgIcon } from '@material-ui/core'
import { ReactComponent as GoogleLogo } from 'assets/images/googleLogo.svg'

const GoogleIcon = (props) => (
  <SvgIcon {...props}>
    <GoogleLogo />
  </SvgIcon>
)

export default GoogleIcon

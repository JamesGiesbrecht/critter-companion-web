import { SvgIcon } from '@material-ui/core'
import { ReactComponent as BlathersLogo } from 'assets/images/blathersLogo.svg'

const BlathersIcon = (props) => (
  <SvgIcon {...props}>
    <BlathersLogo />
  </SvgIcon>
)

export default BlathersIcon

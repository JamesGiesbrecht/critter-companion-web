import { CSSProperties } from '@material-ui/styles'

export const dot = {
  height: '.75em',
  width: '.75em',
  backgroundColor: '#000',
  borderRadius: '50%',
  display: 'inline-block',
  marginLeft: '5px',
} as CSSProperties

export const hidden = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  top: 20,
  width: 1,
} as CSSProperties

import React from 'react'
import { HiddenProps } from '@material-ui/core'

declare module '@material-ui/core/styles/createMixins' {
  export interface Mixins {
    header: {
      height: React.CSSProperties['height']
    }
    drawer: {
      hidden: HiddenProps
      hiddenBreakpoint: string
      visibleBreakpoint: string
      width: React.CSSProperties['width']
    }
  }

  export interface MixinsOptions extends Partial<Mixins> {}
}

declare module '@material-ui/core/styles/createMuiTheme' {
  export interface Theme {}
  // adding custom properties to `createMuiTheme`
  export interface ThemeOptions extends Partial<Theme> {}
}

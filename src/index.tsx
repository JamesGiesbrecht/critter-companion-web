import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from 'reportWebVitals'

import { ColorSchemeContextProvider } from 'context/Theme'
import 'styles/index.css'

import App from 'App'

ReactDOM.render(
  <StrictMode>
    <ColorSchemeContextProvider>
      <App />
    </ColorSchemeContextProvider>
  </StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

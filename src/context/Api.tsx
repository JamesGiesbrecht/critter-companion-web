import { useContext, createContext, FC } from 'react'
import firebase from 'firebase'
import { firebaseDb } from 'firebase/config'
import { noProvider } from 'utility/context'
import useStore, { FormType } from 'store'
import { Button } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { useAuth } from './Auth'

interface ApiContextType {
  userRef: firebase.database.Reference | undefined
  donatedRef: firebase.database.Reference | undefined
  updateCritters: (
    data: { [id: string]: boolean },
    showError?: boolean,
  ) => Promise<any> | undefined | boolean
  on: (
    cb: () => void,
  ) =>
    | ((a: firebase.database.DataSnapshot | null, b?: string | null | undefined) => any)
    | undefined
}

const noApiProvider = () => noProvider('API')

export const ApiContext = createContext<ApiContextType>({
  userRef: undefined,
  donatedRef: undefined,
  updateCritters: noApiProvider,
  on: noApiProvider,
})

export const ApiContextProvider: FC = ({ children }) => {
  const { user, logout } = useAuth()
  const setSnackbar = useStore((state) => state.setSnackbar)
  const setActiveForm = useStore((state) => state.setActiveForm)
  const handleSendVerificationEmail = async () => {
    try {
      await user?.sendEmailVerification()
      setSnackbar({
        open: true,
        text: 'Verification email successfully sent',
        severity: 'success',
      })
    } catch (e) {
      setSnackbar({
        open: true,
        text: 'Error sending verification email. Try again later.',
        severity: 'error',
      })
    }
  }

  let userRef: firebase.database.Reference | undefined
  let donatedRef: firebase.database.Reference | undefined
  let updateCritters
  let on
  if (user) {
    userRef = firebaseDb.ref(`users/${user.uid}`)
    donatedRef = firebaseDb.ref(`users/${user.uid}/donated`)
    updateCritters = async (data: { [id: string]: boolean }, showError?: boolean) => {
      if (!user.emailVerified) {
        if (showError !== false) {
          setSnackbar({
            open: true,
            text: (
              <>
                Email not verified. Verify email address ({user.email}) to synchronize your
                critters.
                <br />
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Button style={{ color: blue[600] }} onClick={handleSendVerificationEmail}>
                  Resend Verification Email.
                </Button>
              </>
            ),
            severity: 'error',
          })
        }
        return false
      }
      try {
        return await donatedRef?.update(data)
      } catch (e) {
        if (e.code === 'PERMISSION_DENIED') {
          logout()
          setActiveForm(FormType.Login)
          setSnackbar({
            open: true,
            text: 'Re-authentication need. Please log in again.',
            severity: 'warning',
          })
          return false
        }
        setSnackbar({
          open: true,
          text: 'Something went wrong. Try again later',
          severity: 'error',
        })
        return false
      }
    }
    on = (cb: () => void) => userRef?.on('value', cb)
  } else {
    updateCritters = () => {
      throw new Error('User not authenticated')
    }
    on = () => {
      throw new Error('User not authenticated')
    }
  }
  const store = {
    userRef,
    donatedRef,
    updateCritters,
    on,
  }
  return <ApiContext.Provider value={store}>{children}</ApiContext.Provider>
}

export const useApi = () => useContext(ApiContext)

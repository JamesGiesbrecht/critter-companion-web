import { useContext, createContext, FC } from 'react'
import firebase from 'firebase'
import { firebaseDb } from 'firebase/config'
import { noProvider } from 'utility/context'
import useStore from 'store'
import { Link } from '@material-ui/core'
import { useAuth } from './Auth'

interface ApiContextType {
  userRef: firebase.database.Reference | undefined
  donatedRef: firebase.database.Reference | undefined
  updateCritters: (data: any) => Promise<any> | undefined | boolean
  on: (
    cb: any,
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
  const { user } = useAuth()
  const setSnackbar = useStore((state) => state.setSnackbar)
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
    updateCritters = (data: any, showError?: boolean) => {
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
                <Link
                  component="button"
                  type="button"
                  variant="body1"
                  onClick={handleSendVerificationEmail}>
                  Resend Verification Email.
                </Link>
              </>
            ),
            severity: 'error',
          })
        }
        return false
      }
      return donatedRef?.update(data)
    }
    on = (cb: any) => userRef?.on('value', cb)
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

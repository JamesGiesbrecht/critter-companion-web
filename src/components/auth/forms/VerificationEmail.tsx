import { FC } from 'react'
import { FormType } from 'store'
import AuthDialog, { AuthFormProps } from 'components/auth/AuthDialog'
import { useAuth } from 'context/Auth'

const VerificationEmail: FC<AuthFormProps> = (props) => {
  const { user } = useAuth()
  return (
    <AuthDialog
      {...props}
      disableSwitchButton
      inputs={{}}
      submitText="Resend Email"
      title="Verification Email Sent"
      type={FormType.VerificationEmail}>
      A verification email has been sent to {user?.email}. Click the link in the email to confirm
      your account.
    </AuthDialog>
  )
}

export default VerificationEmail

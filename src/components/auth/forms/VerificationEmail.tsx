import { FC } from 'react'
import { FormType } from 'store'
import { authInputs } from 'components/auth/LoginSignUpForm'
import AuthDialog, { AuthFormProps } from 'components/auth/AuthDialog'

const VerificationEmail: FC<AuthFormProps> = (props) => (
  <AuthDialog
    {...props}
    inputs={{ email: authInputs.email }}
    submitText="Resend Email"
    title="Verification Email Sent"
    type={FormType.VerificationEmail}
  />
)

export default VerificationEmail

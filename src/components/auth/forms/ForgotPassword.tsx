import { FC } from 'react'
import { FormType } from 'store'
import { authInputs } from 'components/auth/AuthForm'
import AuthDialog, { AuthFormProps } from 'components/auth/AuthDialog'

const ForgotPassword: FC<AuthFormProps> = (props) => (
  <AuthDialog
    {...props}
    inputs={{ email: authInputs.email }}
    submitText="Send Password Reset Email"
    title="Forgot Password"
    type={FormType.ForgotPassword}
  />
)

export default ForgotPassword

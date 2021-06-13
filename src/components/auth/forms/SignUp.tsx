import { FC } from 'react'
import { FormType } from 'store'
import { authInputs } from 'components/auth/AuthForm'
import AuthDialog, { AuthFormProps } from 'components/auth/AuthDialog'

const SignUp: FC<AuthFormProps> = (props) => (
  <AuthDialog
    {...props}
    inputs={{
      email: authInputs.email,
      password: authInputs.password,
      confirmPassword: authInputs.confirmPassword,
    }}
    submitText="Sign Up"
    title="New User Sign Up"
    type={FormType.SignUp}
  />
)

export default SignUp

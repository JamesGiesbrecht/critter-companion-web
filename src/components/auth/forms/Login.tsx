import { FC } from 'react'
import { FormType } from 'store'
import { authInputs } from 'components/auth/LoginSignUpForm'
import AuthDialog, { AuthFormProps } from 'components/auth/AuthDialog'
import FormLink from 'components/auth/FormLink'

const Login: FC<AuthFormProps> = (props) => (
  <AuthDialog
    {...props}
    inputs={{
      email: authInputs.email,
      password: {
        ...authInputs.password,
        after: (
          <FormLink key="forgotPassword" to={FormType.ForgotPassword}>
            Forgot Password?
          </FormLink>
        ),
      },
    }}
    submitText="Login"
    title="Welcome Back"
    type={FormType.Login}
  />
)

export default Login

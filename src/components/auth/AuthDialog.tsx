import { FC, ReactNode, SyntheticEvent } from 'react'
import useStore, { FormType } from 'store'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { LoadingButton } from '@material-ui/lab'
import Form from 'components/common/Form'

interface AuthDialogProps {
  error?: boolean
  helperText?: ReactNode | string
  inputs: any
  isLoading?: boolean
  submitText: string
  title: string
  type: FormType | undefined
  onSubmit: (e: SyntheticEvent, state: any) => void
}

export type AuthFormProps = Partial<AuthDialogProps> & {
  onSubmit: (e: SyntheticEvent, state: any) => void
}

const useStyles = makeStyles((theme) => ({
  formActions: { display: 'flex', flexDirection: 'column' },
  submitError: {
    color: theme.palette.error.main,
  },
}))

const AuthDialog: FC<AuthDialogProps> = ({
  error,
  helperText,
  inputs,
  isLoading,
  submitText,
  title,
  type,
  onSubmit,
}) => {
  const classes = useStyles()
  const activeFormName = useStore<FormType | undefined>((state) => state.activeForm)
  const setActiveFormName = useStore((state) => state.setActiveForm)

  const toggleState = () => {
    setActiveFormName(activeFormName === FormType.Login ? FormType.SignUp : FormType.Login)
  }

  return (
    <>
      <DialogTitle id={type}>{title}</DialogTitle>
      <DialogContent>
        {helperText && (
          <Typography className={error ? classes.submitError : ''} align="center">
            {helperText}
          </Typography>
        )}
        <Form inputs={inputs} type={type} onSubmit={onSubmit}>
          <DialogActions className={classes.formActions}>
            <LoadingButton loading={isLoading} type="submit" color="primary" size="large">
              {submitText}
            </LoadingButton>
            <Button
              type="button"
              size="small"
              color="inherit"
              disabled={isLoading}
              onClick={toggleState}>
              {`Switch to ${type === FormType.Login ? 'Sign Up' : 'Login'}`}
            </Button>
          </DialogActions>
        </Form>
      </DialogContent>
    </>
  )
}

export default AuthDialog

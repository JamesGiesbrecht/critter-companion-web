import { TextField } from '@material-ui/core'
import { FC, Fragment, SyntheticEvent, useEffect, useReducer } from 'react'

interface Props {
  [key: string]: any
  children: any
  type?: string
  onSubmit: (e: SyntheticEvent, state: any) => void
}

enum FormActionType {
  INPUT_UPDATE = 'INPUT_UPDATE',
  INPUT_BLUR = 'INPUT_BLUR',
  INITIALIZE_FORM = 'INITIALIZE_FORM',
  VALIDATE_FORM = 'VALIDATE_FORM',
}

interface FormAction {
  type: FormActionType
  [key: string]: any
}

const validateInput = (input: any, value?: any) => {
  const { label, validation } = input
  if (value === null || value === undefined) {
    // eslint-disable-next-line no-param-reassign
    value = input.value
  }
  const { required, email, min, max, minLength } = validation
  let error = ''

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (required && (!value || value.trim().length === 0)) {
    error = `${label} is required`
  } else if (email && !emailRegex.test(value.toLowerCase())) {
    error = 'Enter a valid email'
  } else if (min != null && +value < min) {
    error = `${label} must be at least ${min}`
  } else if (max != null && +value > max) {
    error = `${label} must be less than ${max}`
  } else if (minLength != null && value.length < minLength) {
    error = `${label} must be at least ${minLength} characters`
  }
  return error
}

const formReducer = (state: any, action: FormAction) => {
  const { inputs } = state
  switch (action.type) {
    case FormActionType.INPUT_UPDATE: {
      const input = inputs[action.inputName]
      const updatedInputs = {
        ...inputs,
        [action.inputName]: {
          ...input,
          value: action.value,
          error: validateInput(input, action.value),
        },
      }
      const formIsValid = Object.keys(updatedInputs).every(
        (inputName) => updatedInputs[inputName].error === '',
      )
      return {
        ...state,
        inputs: updatedInputs,
        formIsValid,
      }
    }
    case FormActionType.INPUT_BLUR: {
      const updatedInputs = {
        ...inputs,
        [action.inputName]: {
          ...inputs[action.inputName],
          touched: true,
        },
      }
      return {
        ...state,
        inputs: updatedInputs,
      }
    }
    case FormActionType.INITIALIZE_FORM: {
      return {
        ...state,
        inputs: action.inputs,
        type: action.formType,
      }
    }
    case FormActionType.VALIDATE_FORM: {
      const updatedInputs: any = {}
      let firstInvalidInput: string | null = null
      const formValidityState = Object.keys(inputs).map((name) => {
        const input = inputs[name]
        const error = validateInput(input)
        updatedInputs[name] = {
          ...input,
          touched: true,
          error,
        }
        const isValid = error === ''
        if (!isValid && !firstInvalidInput) {
          firstInvalidInput = name
        }
        return isValid
      })
      const formIsValid = formValidityState.every((isValid) => isValid)
      if (firstInvalidInput) {
        document.getElementById(firstInvalidInput)?.focus()
      }
      return {
        ...state,
        inputs: updatedInputs,
        formIsValid,
      }
    }
    default:
      return state
  }
}

const Form: FC<Props> = ({ children, inputs, type, onSubmit }) => {
  const [formState, formDispatch] = useReducer(formReducer, {
    inputs,
    type,
    formIsValid: false,
  })

  useEffect(() => {
    if (type && type !== formState.type) {
      formDispatch({ type: FormActionType.INITIALIZE_FORM, inputs, formType: type })
    }
  }, [type, formState.type, inputs])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    formDispatch({ type: FormActionType.VALIDATE_FORM })
    if (formState.formIsValid) {
      onSubmit(e, formState)
    } else {
      console.log('Form is invalid', formState)
    }
  }

  const formElements = Object.keys(formState.inputs).map((name: string) => {
    const input = formState.inputs[name]
    const inputError = input.touched && input.error
    return (
      <Fragment key={name}>
        <TextField
          margin="dense"
          id={name}
          label={input.label}
          type={input.type}
          fullWidth
          variant="filled"
          error={Boolean(inputError)}
          helperText={inputError}
          value={input.value || ''}
          onChange={(e) =>
            formDispatch({
              type: FormActionType.INPUT_UPDATE,
              value: e.target.value,
              inputName: name,
            })
          }
          onBlur={() => formDispatch({ type: FormActionType.INPUT_BLUR, inputName: name })}
        />
        {input.after}
      </Fragment>
    )
  })
  return (
    <form noValidate onSubmit={handleSubmit}>
      {formElements}
      {children}
    </form>
  )
}

export default Form

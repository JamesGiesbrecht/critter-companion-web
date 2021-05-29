import { TextField } from '@material-ui/core'
import { FC, ReactElement, useEffect, useReducer } from 'react'

interface Props {
  [key: string]: any
  type?: string
  onSubmit: () => void
}

enum FormActionType {
  INPUT_UPDATE = 'INPUT_UPDATE',
  INPUT_BLUR = 'INPUT_BLUR',
  INITIALIZE_FORM = 'INITIALIZE_FORM',
}

interface FormAction {
  type: FormActionType
  [key: string]: any
}

const validateInput = (value: any, validation: any) => {
  const { required, email, min, max, minLength } = validation
  let isValid = true

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (required && value.trim().length === 0) {
    isValid = false
  }
  if (email && !emailRegex.test(value.toLowerCase())) {
    isValid = false
  }
  if (min != null && +value < min) {
    isValid = false
  }
  if (max != null && +value > max) {
    isValid = false
  }
  if (minLength != null && value.length < minLength) {
    isValid = false
  }

  return isValid
}

const formReducer = (state: any, action: FormAction) => {
  const { inputs } = state
  switch (action.type) {
    case FormActionType.INPUT_UPDATE: {
      const updatedInputs = {
        ...inputs,
        [action.input]: {
          ...inputs[action.input],
          value: action.value,
          isValid: validateInput(action.value, inputs[action.input].validation),
        },
      }
      const formIsValid = Object.keys(updatedInputs).every(
        (inputName) => updatedInputs[inputName].isValid,
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
        [action.input]: {
          ...inputs[action.input],
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
    default:
      return state
  }
}

const Form: FC<Props> = ({ inputs, type, onSubmit }) => {
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

  const formElements = Object.keys(formState.inputs).map((name: string) => {
    const input = formState.inputs[name]
    const inputError = (!formState.formIsValid || input.touched) && input.error
    return (
      <TextField
        key={name}
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
          formDispatch({ type: FormActionType.INPUT_UPDATE, value: e.target.value, input: name })
        }
        onBlur={() => formDispatch({ type: FormActionType.INPUT_BLUR, input: name })}
      />
    )
  })
  return <>{formElements}</>
}

export default Form

import { ReactNode } from 'react'
import { Breakpoint, TableCellProps } from '@material-ui/core'
import { Critter } from '@james-giesbrecht/critter-companion-utility'

import { FormType } from 'typescript/enums'

export type TableHeadCell = {
  id: keyof Critter
  hidden?: Breakpoint
  align: TableCellProps['align']
  label: string
}

export type InputValidation = {
  required?: boolean
  email?: boolean
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  matches?: {
    name: string
    value?: string | boolean
    label?: string
  }
}

export type Input = {
  label: string
  type: 'password' | 'email' | 'text'
  validation: InputValidation
  value: string
  error?: string
  touched?: boolean
  after?: ReactNode
}

export type InputCollection = { [name: string]: Input }

export type FormState = {
  inputs: InputCollection
  type?: FormType
  formIsValid: boolean
}

export type Order = 'asc' | 'desc'

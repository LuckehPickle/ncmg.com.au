import React, { FunctionComponent } from 'react'
import Copy from './Copy'
import Label from './Label'

interface FormControlProps {
  id: string
  label: string
  help?: string
  isOptional?: boolean
}

const FormControl: FunctionComponent<FormControlProps> = (props) => {
  return (
    <div className="my-9">
      <Label isOptional={props.isOptional}>{props.label}</Label>
      {props.help && <Copy className="mb-0.5">{props.help}</Copy>}
      {props.children}
    </div>
  )
}

export default FormControl

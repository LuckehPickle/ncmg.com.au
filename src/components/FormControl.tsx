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
  const children = React.Children.map(props.children, (child) =>
    React.cloneElement(child as React.ReactElement<any>, {
      name: props.id,
    }),
  )

  return (
    <div className="my-6 sm:my-9">
      <Label htmlFor={props.id} isOptional={props.isOptional}>
        {props.label}
      </Label>
      {props.help && <Copy className="mb-0.5">{props.help}</Copy>}
      {children}
    </div>
  )
}

export default FormControl

import React, { FunctionComponent } from 'react'

interface TextboxProps {
  kind?: string
}

const Textbox: FunctionComponent<TextboxProps> = (props) => (
  <input
    className="text-grey-200 border-0 border-b-2 border-grey-600 bg-grey-700 focus:border-zesty-600 focus:outline-none p-4 leading-none mt-2 w-full max-w-sm"
    type={props.kind ?? 'text'}
  />
)

export default Textbox

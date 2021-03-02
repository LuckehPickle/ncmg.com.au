import React from 'react'

interface TextboxProps {
  name?: string
  kind?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Textbox: React.FunctionComponent<TextboxProps> = (props) => (
  <input
    id={props.name}
    name={props.name}
    className="text-grey-200 border-0 border-b-2 border-grey-600 bg-grey-700 focus:border-zesty-600 focus:outline-none p-4 leading-none mt-1 sm:mt-2 w-full max-w-sm"
    type={props.kind ?? 'text'}
    onChange={props.onChange}
  />
)

export default Textbox

import React from 'react'

interface TextareaProps {
  name?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea: React.FunctionComponent<TextareaProps> = (props) => (
  <textarea
    id={props.name}
    name={props.name}
    className="text-grey-200 border-0 border-b-2 border-grey-600 bg-grey-700 focus:border-zesty-600 focus:outline-none p-4 mt-2 w-full h-40"
    onChange={props.onChange}
  />
)

export default Textarea

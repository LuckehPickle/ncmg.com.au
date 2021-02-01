import React, { FunctionComponent } from 'react'

interface BaseButtonProps {
  className?: string
}

const BaseButton: FunctionComponent<BaseButtonProps> = (props) => {
  const className = props.className ? props.className : ''
  return (
    <button className={`leading-none p-4 ${className}`}>
      {props.children}
    </button>
  )
}

export const PrimaryButton: FunctionComponent = (props) => (
  <BaseButton className="bg-indigo-500 rounded">{props.children}</BaseButton>
)

export const SecondaryButton: FunctionComponent = (props) => (
  <BaseButton className="bg-gray-700 text-white rounded">{props.children}</BaseButton>
)

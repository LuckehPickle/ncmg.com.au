import React from 'react'

interface WrapperProps {
  id?: string
}

const Wrapper: React.FunctionComponent<WrapperProps> = (props) => (
  <div id={props.id} className="flex flex-col">
    <div className="flex flex-col min-h-screen">{props.children}</div>
  </div>
)

const Content: React.FunctionComponent = (props) => (
  <div className="flex-1">{props.children}</div>
)

const GrowLayout = {
  Wrapper,
  Content,
}

export default GrowLayout

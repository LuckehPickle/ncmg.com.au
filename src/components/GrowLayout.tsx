import React from 'react'

const Wrapper: React.FunctionComponent = (props) => (
  <div className="flex flex-col">
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

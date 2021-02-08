import React, { FunctionComponent } from 'react'

interface WrapperProps {
  className?: string
}

const Wrapper: FunctionComponent<WrapperProps> = (props) => {
  const classes = ['max-w-screen-xl', 'w-full', 'my-0', 'mx-auto', 'px-4']
  props.className && classes.push(props.className)

  return <div className={classes.join(' ')}>{props.children}</div>
}

export default Wrapper

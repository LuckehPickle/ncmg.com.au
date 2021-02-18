import React from 'react'

interface WrapperProps {
  className?: string
  width?: 'none' | 'prose' | 'full'
}

const Wrapper: React.FunctionComponent<WrapperProps> = (props) => {
  const styles = ['w-full', 'my-0', 'mx-auto', 'px-4']

  props.className && styles.push(props.className)
  props.width
    ? styles.push(`max-w-${props.width}`)
    : styles.push('max-w-screen-xl')

  return <div className={styles.join(' ')}>{props.children}</div>
}

export default Wrapper

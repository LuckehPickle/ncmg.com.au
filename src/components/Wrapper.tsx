import React from 'react'

interface WrapperProps {
  className?: string
  width?: 'max-w-none' | 'max-w-prose' | 'max-w-full'
  collapseOnMobile?: boolean
}

const Wrapper: React.FunctionComponent<WrapperProps> = (props) => {
  const styles = [
    'w-full',
    'my-0',
    'mx-auto',
    props.collapseOnMobile ? 'sm:px-5' : 'px-5',
  ]

  props.className && styles.push(props.className)
  props.width ? styles.push(props.width) : styles.push('max-w-screen-xl')

  return <div className={styles.join(' ')}>{props.children}</div>
}

export default Wrapper

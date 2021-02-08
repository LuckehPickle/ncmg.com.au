import React, { FunctionComponent } from 'react'

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  variant?: 'title'
}

const styles = {
  common: 'font-semibold text-white',
  variants: {
    title: 'text-5xl',
  },
}

const Heading: FunctionComponent<HeadingProps> = (props) => {
  const Elem = `h${props.level}`

  const classes = [styles.common]
  props.variant && classes.push(styles.variants[props.variant])
  props.className && classes.push(props.className)

  return <Elem className={classes.join(' ')}>{props.children}</Elem>
}

export default Heading

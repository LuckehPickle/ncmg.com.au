import React, { FunctionComponent } from 'react'

interface CopyProps {
  className?: string
  variant?: 'subtitle'
}

const styles = {
  common: 'text-grey-200 max-w-prose',
  variants: {
    subtitle: 'text-xl',
  },
}

const Copy: FunctionComponent<CopyProps> = (props) => {
  const classes = [styles.common]
  props.className && classes.push(props.className)
  props.variant && classes.push(styles.variants[props.variant])

  return <p className={classes.join(' ')}>{props.children}</p>
}

export default Copy

import React, { FunctionComponent } from 'react'

interface CopyProps {
  id?: string
  className?: string
  variant?: 'subtitle'
  align?: 'left' | 'center' | 'right'
  measure?: boolean
}

const styles = {
  common: 'text-grey-200 font-light',
  variants: {
    subtitle: 'text-2xl',
  },
  centerAlign: 'text-center',
  rightAlign: 'text-right',
  measure: 'max-w-prose',
}

export const Bold: FunctionComponent = (props) => (
  <strong className="text-transparent font-normal bg-clip-text bg-gradient-to-tl from-zesty-400 to-zesty-300">
    {props.children}
  </strong>
)

const Copy: FunctionComponent<CopyProps> = (props) => {
  const { className, variant, ...rest } = props

  const classes = [styles.common]
  className && classes.push(className)
  variant && classes.push(styles.variants[variant])

  props.align === 'center' && classes.push(styles.centerAlign)
  props.align === 'right' && classes.push(styles.rightAlign)
  ;(props.measure ?? true) && classes.push(styles.measure)

  return <p className={classes.join(' ')} {...rest} />
}

export default Copy

import React, { FunctionComponent } from 'react'

interface CopyProps {
  id?: string
  className?: string
  variant?: 'large' | 'medium'
  align?: 'left' | 'center' | 'right' | 'justify'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  measure?: boolean
}

const styles = {
  common: 'text-grey-200 font-light',
  variants: {
    large: 'text-xl',
    medium: 'text-lg',
  },
  measure: 'max-w-prose',
}

export const Bold: FunctionComponent = (props) => (
  <strong className="text-transparent font-unset bg-clip-text bg-gradient-to-tl from-zesty-400 to-zesty-300">
    {props.children}
  </strong>
)

const Copy: FunctionComponent<CopyProps> = (props) => {
  const { className, variant, ...rest } = props

  const classes = [styles.common]
  className && classes.push(className)
  variant && classes.push(styles.variants[variant])

  props.align && classes.push(`text-${props.align}`)
  props.size && classes.push(`text-${props.size}`)
  ;(props.measure ?? true) && classes.push(styles.measure)

  return <p className={classes.join(' ')} {...rest} />
}

export default Copy

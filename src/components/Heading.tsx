import React, { FunctionComponent } from 'react'

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  id?: string
  className?: string
  variant?: 'title'
}

const styles = {
  common: 'font-medium text-white',
  levels: {
    1: 'text-2xl',
    2: 'text-xl',
    3: 'text-lg',
    4: '',
    5: '',
    6: '',
  },
  variants: {
    title: 'text-5xl font-semibold',
  },
}

const Heading: FunctionComponent<HeadingProps> = (props) => {
  const { level, className, variant, ...rest } = props

  const Elem = `h${level}`

  const classes = [styles.common]
  classes.push(styles.levels[level])
  variant && classes.push(styles.variants[variant])
  className && classes.push(className)

  return <Elem className={classes.join(' ')} {...rest} />
}

export default Heading

import React, { FunctionComponent } from 'react'

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  id?: string
  className?: string
  align?: 'left' | 'center' | 'right'
}

const styles = {
  levels: {
    1: 'text-3xl sm:text-5xl font-display font-extrabold',
    2: 'sm:text-4xl font-semibold',
    3: 'text-lg sm:text-xl font-semibold',
    4: 'text-lg font-medium',
    5: 'text-md font-medium',
    6: 'text-sm font-medium',
  },
  align: {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  },
}

const Heading: FunctionComponent<HeadingProps> = (props) => {
  const Elem = `h${props.level}`

  const classes = ['text-white', styles.levels[props.level]]

  props.className && classes.push(props.className)
  props.align && classes.push(styles.align[props.align])

  return <Elem className={classes.join(' ')}>{props.children}</Elem>
}

export default Heading

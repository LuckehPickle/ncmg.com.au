import React, { FunctionComponent } from 'react'

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  id?: string
  className?: string
  align?: 'left' | 'center' | 'right' | 'justify'
  weight?: 'medium' | 'semibold' | 'bold'
}

const styles = {
  levels: {
    1: 'text-5xl font-display font-extrabold',
    2: 'text-4xl font-semibold',
    3: 'text-xl',
    4: 'text-lg',
    5: 'text-md',
    6: 'text-sm',
  },
}

const Heading: FunctionComponent<HeadingProps> = (props) => {
  const Elem = `h${props.level}`

  const classes = [
    'text-white',
    props.weight ? `font-${props.weight}` : '',
    styles.levels[props.level],
  ]

  props.className && classes.push(props.className)
  props.align && classes.push(`text-${props.align}`)

  return <Elem className={classes.join(' ')}>{props.children}</Elem>
}

export default Heading

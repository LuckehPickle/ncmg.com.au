import React, { FunctionComponent } from 'react'
import { Link as GatsbyLink } from 'gatsby'

interface LinkProps {
  to: string
  internal?: boolean
}

const styles = {
  common: 'text-zesty-400 underline focus:outline-white',
}

const Link: FunctionComponent<LinkProps> = (props) => {
  if (props.internal) {
    return (
      <a href={props.to} className={styles.common}>
        {props.children}
      </a>
    )
  }

  return (
    <GatsbyLink to={props.to} className={styles.common}>
      {props.children}
    </GatsbyLink>
  )
}

export default Link

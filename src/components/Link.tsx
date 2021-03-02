import React, { FunctionComponent } from 'react'
import { Link as GatsbyLink } from 'gatsby'

interface LinkProps {
  onClick?: () => void
  to?: string
  external?: boolean
}

const styles = {
  common: 'cursor-pointer text-zesty-400 underline focus:outline-white',
}

const Link: FunctionComponent<LinkProps> = (props) => {
  if (props.external || props.onClick) {
    return (
      <a
        href={props.to}
        onClick={props.onClick}
        className={styles.common}
        tabIndex={0}
      >
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

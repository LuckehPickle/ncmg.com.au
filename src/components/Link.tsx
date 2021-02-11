import React, { FunctionComponent } from 'react'
import { Link as GatsbyLink } from 'gatsby'

interface LinkProps {
  to: string
}

const Link: FunctionComponent<LinkProps> = (props) => (
  <GatsbyLink
    to={props.to}
    className="text-zesty-300 underline focus:outline-zesty"
  >
    {props.children}
  </GatsbyLink>
)

export default Link

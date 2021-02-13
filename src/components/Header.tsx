import React from 'react'
import { Link } from 'gatsby'

import Logo from './Logo'
import Wrapper from './Wrapper'

const Header: React.FunctionComponent = () => (
  <header className="bg-grey-900 border-t-4 border-zesty-500 py-7">
    <Wrapper className="flex justify-between items-center leading-none">
      <Link
        to="/"
        className="inline-block py-1 focus:outline-white"
        title="Visit NCMG homepage"
      >
        <Logo size="small" />
      </Link>
    </Wrapper>
  </header>
)

export default Header

import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'

import Logo from './Logo'
import Wrapper from './Wrapper'
import { SecondaryButton } from './Button'
import { useMessageUsModal } from '../context/messageUs'

const Header: FunctionComponent = () => {
  const { enableModal } = useMessageUsModal()

  return (
    <header className="bg-grey-900 border-t-4 border-zesty-600">
      <Wrapper className="flex justify-between items-center leading-none">
        <Link
          to="/"
          className="inline-block py-5 focus:outline-zesty"
          title="Visit NCMG homepage"
        >
          <Logo size="small" />
        </Link>

        <SecondaryButton onClick={() => enableModal()}>
          Send us a message
        </SecondaryButton>
      </Wrapper>
    </header>
  )
}

export default Header

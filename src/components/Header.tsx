import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'
import Logo from './Logo'
import { SecondaryButton } from './Button'

const Header: FunctionComponent = () => (
  <header className="flex justify-center bg-gray-900 border-t-4 border-indigo-500">
    <div className="flex justify-between items-center max-w-screen-xl w-full leading-none">
      <Link to="/" className="inline-block py-5">
        <Logo size="small" />
      </Link>

      <SecondaryButton>Send us a message</SecondaryButton>
    </div>
  </header>
)

export default Header

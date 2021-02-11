import React, { FunctionComponent } from 'react'

const SkipLink: FunctionComponent = () => (
  <a
    href="#main"
    className="absolute top-3 left-2 z-10 transform-gpu -translate-y-20 focus:translate-y-0 block py-3 px-5 text-white transition-transform bg-grey-900 focus:outline-zesty"
  >
    Skip to content
  </a>
)

export default SkipLink

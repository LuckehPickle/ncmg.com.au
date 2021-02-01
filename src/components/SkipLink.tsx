import React, { FunctionComponent } from 'react'

const SkipLink: FunctionComponent = () => (
  <a
    href="#main"
    className="absolute top-2 left-2 z-10 transform-gpu -translate-y-12 focus:translate-y-0 block py-4 px-6 text-white transition-transform"
  >
    Skip to content
  </a>
)

export default SkipLink

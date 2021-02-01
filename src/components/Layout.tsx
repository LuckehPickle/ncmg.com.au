import React, { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet'
import Header from './Header'
import SkipLink from './SkipLink'

const Layout: FunctionComponent = (props) => (
  <div>
    <Helmet defaultTitle="North Coast Marble & Granite">
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Helmet>

    <SkipLink />
    <Header />

    <main id="main">{props.children}</main>
  </div>
)

export default Layout

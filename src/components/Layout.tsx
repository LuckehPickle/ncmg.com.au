import React, { FunctionComponent, useState } from 'react'
import { Helmet } from 'react-helmet'

import Header from './Header'
import MessageUsModal from './MessageUsModal'
import SkipLink from './SkipLink'
import { MessageUsContext } from '../context/messageUs'

const Layout: FunctionComponent = (props) => {
  const [isShowingModal, setShowingModal] = useState(false)

  function enableModal() {
    setShowingModal(true)
  }

  function disableModal() {
    setShowingModal(false)
  }

  return (
    <MessageUsContext.Provider
      value={{
        isShowingModal,
        enableModal,
        disableModal,
      }}
    >
      <Helmet defaultTitle="North Coast Marble & Granite">
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Helmet>

      <SkipLink />
      <Header />

      <MessageUsModal />

      <main id="main">{props.children}</main>
    </MessageUsContext.Provider>
  )
}

export default Layout

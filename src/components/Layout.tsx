import React, { FunctionComponent, useState } from 'react'
import { Helmet } from 'react-helmet'

import Footer from './Footer'
import Header from './Header'
import MessageUsModal from './MessageUsModal'
import SkipLink from './SkipLink'
import { MessageUsContext } from '../context/messageUs'
import GrowLayout from './GrowLayout'

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
      <GrowLayout.Wrapper>
        <Helmet defaultTitle="North Coast Marble & Granite">
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Helmet>

        <SkipLink />
        <Header />

        <MessageUsModal />

        <GrowLayout.Content>
          <main id="main">{props.children}</main>
        </GrowLayout.Content>

        <Footer />
      </GrowLayout.Wrapper>
    </MessageUsContext.Provider>
  )
}

export function withLayout<T>(WrappedComponent: React.ComponentType<T>) {
  const WithLayout: FunctionComponent<T> = (props) => (
    <Layout>
      <WrappedComponent {...props} />
    </Layout>
  )

  return WithLayout
}

export default Layout

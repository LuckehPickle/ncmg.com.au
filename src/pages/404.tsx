import React from 'react'

import Copy, { Bold } from '../components/Copy'
import Heading from '../components/Heading'
import SEO from '../components/SEO'
import Wrapper from '../components/Wrapper'
import { SecondaryButton } from '../components/Button'
import { withLayout } from '../components/Layout'

const NotFoundPage: React.FunctionComponent = () => (
  <Wrapper className="my-20" width="prose">
    <SEO title="Page not found" />

    <Heading level={1}>Page Not Found</Heading>
    <Copy variant="large" className="my-6">
      Sorry, but there doesn't seem to be a page at this address.{' '}
      <Bold>Double check that the URL is correct</Bold>. If all else fails,
      maybe you can find what you were looking for at the home page.
    </Copy>
    <SecondaryButton to="/">Return home</SecondaryButton>
  </Wrapper>
)

export default withLayout(NotFoundPage)

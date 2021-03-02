import React from 'react'

import ArrowNarrowRightIcon from '../components/icons/ArrowNarrowRight'
import Copy from '../components/Copy'
import Heading from '../components/Heading'
import SEO from '../components/SEO'
import Wrapper from '../components/Wrapper'
import { SecondaryButton } from '../components/Button'
import { withLayout } from '../components/Layout'

const ThanksPage: React.FunctionComponent = () => (
  <Wrapper className="my-20" width="max-w-prose">
    <SEO title="Thanks!" noIndex />

    <Heading level={1}>Thanks!</Heading>
    <Copy variant="large" className="my-6">
      We'll be in touch with you as soon as possible.
    </Copy>
    <SecondaryButton icon={ArrowNarrowRightIcon} to="/">
      Return home
    </SecondaryButton>
  </Wrapper>
)

export default withLayout(ThanksPage)

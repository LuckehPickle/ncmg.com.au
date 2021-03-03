import React from 'react'

import ContactBanner from '../components/landing/ContactBanner'
import CoverageMap from '../components/landing/CoverageMap'
import Faq from '../components/landing/Faq'
import Hero from '../components/landing/Hero'
import ProductsAndServices from '../components/landing/ProductsAndServices'
import SEO from '../components/SEO'
import { withLayout } from '../components/Layout'

const LandingPage: React.FunctionComponent = () => (
  <>
    <SEO />
    <Hero />
    <ProductsAndServices />
    <CoverageMap />
    <ContactBanner />
    <Faq />
  </>
)

export default withLayout(LandingPage)

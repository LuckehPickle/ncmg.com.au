import React from 'react'
import Image from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'

import ContactBanner from '../components/landing/ContactBanner'
import Copy, { Bold } from '../components/Copy'
import CoverageMap from '../components/landing/CoverageMap'
import FAQ from '../components/landing/FAQ'
import Heading from '../components/Heading'
import MailOpenIcon from '../components/icons/MailOpen'
import ProductsAndServices from '../components/landing/ProductsAndServices'
import SEO from '../components/SEO'
import Wrapper from '../components/Wrapper'
import { PrimaryButton } from '../components/Button'
import { useMessageUsModal } from '../context/messageUs'
import { withLayout } from '../components/Layout'

const query = graphql`
  query {
    kitchen: file(relativePath: { eq: "kitchen-cropped.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const LandingPage: React.FunctionComponent = () => {
  const { enableModal } = useMessageUsModal()

  const data = useStaticQuery(query)

  return (
    <>
      <SEO />

      <div className="pt-20 pb-24 bg-grey-900">
        <Wrapper>
          <div className="grid grid-cols-2 gap-20 items-center">
            <div>
              <Heading level={1}>
                The leading choice for marble and granite.
              </Heading>

              <Copy variant="large" className="my-6">
                We create <Bold>benchtops, vanities and more</Bold>. With the
                latest machinery and a team of highly experienced trade staff,
                we can complete any job throughout the Mid North Coast.
              </Copy>

              <PrimaryButton
                onClick={() => enableModal()}
                className="mt-10"
                icon={MailOpenIcon}
              >
                Request a quote! It's easy
              </PrimaryButton>
            </div>

            <Image
              className="rounded shadow-glow"
              fluid={data.kitchen.childImageSharp.fluid}
              alt="An excellent kitchen"
            />
          </div>
        </Wrapper>
      </div>

      <ProductsAndServices />
      <CoverageMap />
      <ContactBanner />
      <FAQ />
    </>
  )
}

export default withLayout(LandingPage)

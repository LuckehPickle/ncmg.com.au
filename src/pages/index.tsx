import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'

import Columns from '../components/layout/Columns'
import Copy, { Bold } from '../components/Copy'
import FAQ from '../components/landing/FAQ'
import Heading from '../components/Heading'
import MailOpenIcon from '../components/icons/MailOpen'
import PhoneIcon from '../components/icons/Phone'
import ProductsAndServices from '../components/landing/ProductsAndServices'
import Wrapper from '../components/Wrapper'
import { PrimaryButton, SecondaryButton } from '../components/Button'
import { useMessageUsModal } from '../context/messageUs'
import { withLayout } from '../components/Layout'

const LandingPage: React.FunctionComponent = () => {
  const { enableModal } = useMessageUsModal()

  const data = useStaticQuery(graphql`
    query {
      kitchen: file(relativePath: { eq: "kitchen-cropped.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      coverageMap: file(relativePath: { eq: "coverage-map.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <>
      <div className="pt-20 pb-24 bg-grey-900">
        <Wrapper>
          <Columns columns="2" gap="20" verticalAlign="center">
            <div>
              <Heading level={1}>
                The leading choice for marble and granite.
              </Heading>

              <Copy variant="large" className="my-6">
                We create <Bold>kitchens, bathrooms and more</Bold>. With the
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
          </Columns>
        </Wrapper>
      </div>

      <ProductsAndServices />

      <div className="py-32 bg-grey-900">
        <Wrapper>
          <Columns columns="2" gap="20" verticalAlign="center">
            <Image
              className="rounded"
              fluid={data.coverageMap.childImageSharp.fluid}
              alt="Covering everywhere from Coffs Harbour to Forster"
            />

            <div>
              <Heading level={1}>Servicing the Mid North Coast</Heading>
              <Copy variant="medium" className="mt-4">
                We'll take on jobs everywhere{' '}
                <Bold>from Coffs Harbour to Forster</Bold>. We also take on
                special projects as far away as Sydney when required.
              </Copy>
            </div>
          </Columns>
        </Wrapper>
      </div>

      <div className="pt-24 bg-grey-800">
        <Wrapper>
          <div className="flex items-center justify-between bg-contact-pattern bg-cover rounded p-10 -mx-10">
            <Heading level={3}>
              Ready to get started?
              <br />
              <Bold>Get in touch with our friendly staff.</Bold>
            </Heading>

            <div className="flex items-center">
              <PrimaryButton
                onClick={() => enableModal()}
                icon={MailOpenIcon}
                className="mr-4"
              >
                Send a message
              </PrimaryButton>

              <SecondaryButton icon={PhoneIcon}>Call us</SecondaryButton>
            </div>
          </div>
        </Wrapper>
      </div>

      <FAQ />
    </>
  )
}

export default withLayout(LandingPage)

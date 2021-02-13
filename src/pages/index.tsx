import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'

import Copy, { Bold } from '../components/Copy'
import Heading from '../components/Heading'
import MailOpenIcon from '../components/icons/MailOpen'
import PhoneIcon from '../components/icons/Phone'
import Wrapper from '../components/Wrapper'
import { PrimaryButton, SecondaryButton } from '../components/Button'
import { useMessageUsModal } from '../context/messageUs'
import { withLayout } from '../components/Layout'

const LandingPage: React.FunctionComponent = () => {
  const { enableModal } = useMessageUsModal()

  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "kitchen-cropped.png" }) {
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
          <div className="grid grid-cols-2 gap-20 items-center">
            <div>
              <Heading level={1} variant="title">
                {/* The Mid North Coast's leading choice for stone benchtops */}
                {/* The leading choice for benchtops throughout the Mid North Coast */}
                {/* Designing with Marble, Granite, &amp; Stone on the Mid North Coast */}
                {/* The leading choice for stone throughout the Mid North Coast */}
                {/* Marble, stone, and granite. */}
                Your leading choice in marble, granite &amp; more.
              </Heading>

              <Copy variant="subtitle" className="my-8">
                We create <Bold>kitchens, bathrooms and more</Bold>. With the
                latest machinery and a team of highly experienced trade staff,
                we can complete any job throughout the Mid North Coast.
              </Copy>

              <PrimaryButton
                onClick={() => enableModal()}
                className="mt-2"
                icon={MailOpenIcon}
              >
                Request a quote! It's easy
              </PrimaryButton>
            </div>

            <Image
              className="rounded shadow-glow"
              fluid={data.file.childImageSharp.fluid}
              alt="An excellent kitchen"
            />
          </div>
        </Wrapper>
      </div>

      <div className="py-20 bg-grey-800">
        <Wrapper>
          <div className="flex items-center justify-between bg-contact-pattern bg-cover rounded p-10 -mx-10">
            <Heading level={1}>
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
    </>
  )
}

export default withLayout(LandingPage)

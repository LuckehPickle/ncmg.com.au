import React, { FunctionComponent } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'

import Copy, { Bold } from '../components/Copy'
import Heading from '../components/Heading'
import MailOpenIcon from '../components/icons/MailOpen'
import Wrapper from '../components/Wrapper'
import { PrimaryButton } from '../components/Button'
import { useMessageUsModal } from '../context/messageUs'
import { withLayout } from '../components/Layout'

const LandingPage: FunctionComponent = () => {
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
    <div className="py-20 bg-grey-800">
      <Wrapper>
        <div className="grid grid-cols-2 gap-20 items-center">
          <div>
            <Heading level={1} variant="title">
              {/* The Mid North Coast's leading choice for stone benchtops */}
              {/* The leading choice for benchtops throughout the Mid North Coast */}
              Designing with Marble, Granite, &amp; Stone on the Mid North Coast
            </Heading>

            <Copy variant="subtitle" className="my-8">
              We offer <Bold>kitchens, bathrooms, and more</Bold>. With the
              latest machinery and a team of highly experienced trade staff, we
              can service your needs. Request a quote today, to experience the
              NCMG advantage firsthand.
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
            className="rounded"
            fluid={data.file.childImageSharp.fluid}
            alt="An excellent kitchen"
          />
        </div>
      </Wrapper>
    </div>
  )
}

export default withLayout(LandingPage)

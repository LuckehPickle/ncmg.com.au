import React from 'react'
import Image from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'

import Copy, { Bold } from '../Copy'
import Heading from '../Heading'
import MailOpenIcon from '../icons/MailOpen'
import Wrapper from '../Wrapper'
import { PrimaryButton } from '../Button'
import { useMessageUsModal } from '../../context/messageUs'

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

const Hero: React.FunctionComponent = () => {
  const { enableModal } = useMessageUsModal()

  const data = useStaticQuery(query)

  return (
    <div className="py-12 lg:pt-20 bg-grey-900">
      <Wrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <Heading level={1}>
              The leading choice for marble and granite.
            </Heading>

            <Copy variant="large" className="my-4 md:my-6">
              We create <Bold>benchtops, vanities and more</Bold>. With the
              latest machinery and a team of highly experienced trade staff, we
              can complete any job throughout the Mid North Coast.
            </Copy>

            <PrimaryButton
              onClick={() => enableModal()}
              className="mt-4 sm:mt-4"
              icon={MailOpenIcon}
            >
              Request a quote! It's easy
            </PrimaryButton>
          </div>

          <Image
            className="rounded shadow-glow"
            fluid={data.kitchen.childImageSharp.fluid}
            alt="An excellent kitchen, created by NCMG"
          />
        </div>
      </Wrapper>
    </div>
  )
}

export default Hero

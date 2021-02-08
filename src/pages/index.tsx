import React, { FunctionComponent } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'

import Copy from '../components/Copy'
import Heading from '../components/Heading'
import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'
import { PrimaryButton } from '../components/Button'
import { useMessageUsModal } from '../context/messageUs'

const LandingPage: FunctionComponent = () => {
  const { enableModal } = useMessageUsModal()

  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "kitchen.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <div className="py-20 bg-grey-800">
        <Wrapper>
          <div className="grid grid-cols-2 gap-14">
            <div>
              <Heading level={1} variant="title">
                Experience the North Coast Marble &amp; Granite Advantage
              </Heading>

              <Copy variant="subtitle" className="my-6">
                Whether you are in search of the classic beauty and unique
                appeal of natural stone or the robustness and clean lines of
                engineered quartz, at NCMG we have got you covered.
              </Copy>

              <PrimaryButton onClick={() => enableModal()}>
                Request a quote! It's easy
              </PrimaryButton>
            </div>

            <Image
              fluid={data.file.childImageSharp.fluid}
              alt="An excellent kitchen"
            />
          </div>
        </Wrapper>
      </div>
    </Layout>
  )
}

export default LandingPage

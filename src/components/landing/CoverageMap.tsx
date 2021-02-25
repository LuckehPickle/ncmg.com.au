import React from 'react'
import Image from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'

import Copy, { Bold } from '../Copy'
import Heading from '../Heading'
import MapIcon from '../icons/Map'
import Wrapper from '../Wrapper'
import { SecondaryButton } from '../Button'

const CoverageMap: React.FunctionComponent = () => {
  const data = useStaticQuery(graphql`
    query {
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
    <div className="py-16 sm:py-32 bg-grey-900">
      <Wrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-20 items-center">
          <Image
            className="rounded"
            fluid={data.coverageMap.childImageSharp.fluid}
            alt="Covering everywhere from Coffs Harbour to Forster"
          />

          <div>
            <Heading level={1}>
              Open for business on the Mid North Coast
            </Heading>

            <Copy variant="large" className="mt-4 sm:mt-6">
              Operating out of <Bold>Port Macquarie</Bold>, we&apos;ll take on
              jobs everywhere <Bold>from Coffs Harbour to Forster</Bold>. We
              also take on special projects as far away as Sydney from
              time-to-time.
            </Copy>

            <SecondaryButton
              className="mt-6 sm:mt-8"
              icon={MapIcon}
              to="https://goo.gl/maps/7nnbpDPfkDaQJccDA"
            >
              See us on Google Maps
            </SecondaryButton>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default CoverageMap

import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'

import Copy, { Bold } from '../Copy'
import Heading from '../Heading'
import MapIcon from '../icons/Map'
import Wrapper from '../Wrapper'
import { SecondaryButton } from '../Button'

const CoverageMap: React.FunctionComponent = () => {
  const data = useStaticQuery(graphql`
    {
      coverageMap: file(relativePath: { eq: "coverage-map.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `)

  return (
    <div className="py-16 md:py-32 bg-grey-900">
      <Wrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
          <GatsbyImage
            image={data.coverageMap.childImageSharp.gatsbyImageData}
            className="rounded max-w-md lg:max-w-none"
            alt="A coverage map, showing numerous locations between Coffs Harbour and Forster. Port Macquarie has a home icon."
          />

          <div>
            <Heading level={1}>
              Open for business on the Mid North Coast
            </Heading>

            <Copy variant="large" className="mt-4 md:mt-6">
              Operating out of <Bold>Port Macquarie</Bold>, we&apos;ll take on
              jobs everywhere <Bold>from Coffs Harbour to Forster</Bold>. We
              also take on special projects as far away as Sydney from
              time-to-time.
            </Copy>

            <SecondaryButton
              className="mt-6 md:mt-8"
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

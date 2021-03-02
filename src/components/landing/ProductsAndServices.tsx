import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Copy, { Bold } from '../Copy'
import Heading from '../Heading'
import Product from './Product'
import Wrapper from '../Wrapper'
import ArrowNarrowRightIcon from '../icons/ArrowNarrowRight'

const ProductsAndServices: React.FunctionComponent = () => {
  const [hasSwiped, setHasSwiped] = useState(false)

  const data = useStaticQuery(graphql`
    {
      kitchen: file(relativePath: { eq: "kitchen-cropped.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      bathroom: file(relativePath: { eq: "bathroom.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      splashback: file(relativePath: { eq: "splashback.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      bar: file(relativePath: { eq: "bar.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `)

  return (
    <div className="py-20 md:py-32 bg-gradient-to-t from-grey-800 to-grey-900">
      <Wrapper width="max-w-prose">
        <Heading level={1} align="center">
          Offering a wide range of products and services
        </Heading>

        <Copy className="mt-4 md:mt-8" variant="large">
          Looking for some inspiration? We can shape stone for almost anything
          you can imagine, <Bold>residential and commercial</Bold>. Just send us
          a message and we can talk through the possibilities.
        </Copy>
      </Wrapper>

      <Wrapper>
        <div
          className={[
            'flex items-center mt-8 sm:hidden transition-opacity delay-200',
            hasSwiped ? 'opacity-0' : 'opacity-100',
          ].join(' ')}
          aria-hidden={true}
        >
          <Copy className="mr-2">
            <Bold>Hint</Bold>: swipe for more
          </Copy>
          <ArrowNarrowRightIcon className="inline text-white animate-swipe" />
        </div>

        <div
          className="grid grid-cols-mobile sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-2 sm:mt-8 md:mt-16 max-w-full overflow-x-scroll sm:overflow-hidden"
          onTouchMove={() => setHasSwiped(true)}
        >
          <Product
            label="Kitchen Benchtops"
            image={data.kitchen.childImageSharp.gatsbyImageData}
            alt="A kitchen benchtop made from marble"
          />
          <Product
            label="Bathroom Vanities"
            image={data.bathroom.childImageSharp.gatsbyImageData}
            alt="A stone vanity"
          />
          <Product
            label="Splashbacks"
            image={data.splashback.childImageSharp.gatsbyImageData}
            alt="A marble splashback in a kitchen"
          />
          <Product
            label="Bar Tops"
            image={data.bar.childImageSharp.gatsbyImageData}
            alt="The front of a bar"
          />
          <Product
            label="BBQs"
            image={data.kitchen.childImageSharp.gatsbyImageData}
            alt="TBA"
          />
          <Product
            label="Fireplaces"
            image={data.kitchen.childImageSharp.gatsbyImageData}
            alt="TBA"
          />
        </div>
      </Wrapper>
    </div>
  )
}

export default ProductsAndServices

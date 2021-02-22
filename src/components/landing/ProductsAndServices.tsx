import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Copy, { Bold } from '../Copy'
import Heading from '../Heading'
import Product from './Product'
import Wrapper from '../Wrapper'

const ProductsAndServices: React.FunctionComponent = () => {
  const data = useStaticQuery(graphql`
    query {
      kitchen: file(relativePath: { eq: "kitchen-cropped.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      bathroom: file(relativePath: { eq: "bathroom.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      splashback: file(relativePath: { eq: "splashback.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      bar: file(relativePath: { eq: "bar.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <div className="py-32 bg-gradient-to-t from-grey-800 to-grey-900">
      <Wrapper width="prose">
        <Heading level={1} align="center">
          Offering a wide range of products and services
        </Heading>

        <Copy className="mt-8" variant="large">
          Looking for some inspiration? We can shape stone for almost anything
          you can imagine, <Bold>residential and commercial</Bold>. Just send us
          a message and we can talk through the possibilities.
        </Copy>
      </Wrapper>

      <Wrapper>
        <div className="grid grid-cols-3 gap-8 mt-16">
          <Product
            label="Kitchen Benchtops"
            image={data.kitchen.childImageSharp.fluid}
            alt=""
          />
          <Product
            label="Bathroom Vanities"
            image={data.bathroom.childImageSharp.fluid}
          />
          <Product
            label="Splashbacks"
            image={data.splashback.childImageSharp.fluid}
          />
          <Product label="Bar Tops" image={data.bar.childImageSharp.fluid} />
          <Product label="BBQs" image={data.kitchen.childImageSharp.fluid} />
          <Product
            label="Fireplaces"
            image={data.kitchen.childImageSharp.fluid}
          />
        </div>
      </Wrapper>
    </div>
  )
}

export default ProductsAndServices

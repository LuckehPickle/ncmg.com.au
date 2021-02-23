import React from 'react'
import Image, { FluidObject } from 'gatsby-image'
import Heading from '../Heading'

interface ProductProps {
  label?: string
  image?: FluidObject
  alt?: string
}

const Product: React.FunctionComponent<ProductProps> = (props) => (
  <div>
    {props.image && (
      <Image className="rounded mb-3" fluid={props.image} alt={props.alt} />
    )}
    <Heading level={5}>{props.label ?? 'Product'}</Heading>
  </div>
)

export default Product

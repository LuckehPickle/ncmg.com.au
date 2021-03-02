import React from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import Heading from '../Heading'

interface ProductProps {
  label?: string
  image?: IGatsbyImageData
  alt?: string
}

const Product: React.FunctionComponent<ProductProps> = (props) => (
  <div>
    {props.image && (
      <GatsbyImage
        image={props.image}
        className="rounded mb-3"
        alt={props.alt}
      />
    )}
    <Heading level={5}>{props.label ?? 'Product'}</Heading>
  </div>
)

export default Product

import React from 'react'
import Copy, { Bold } from '../Copy'
import Heading from '../Heading'
import Columns from '../layout/Columns'
import Product from './Product'
import Wrapper from '../Wrapper'

const ProductsAndServices: React.FunctionComponent = () => (
  <div className="py-32 bg-grey-800">
    <Wrapper width="prose">
      <Heading level={1} align="center">
        Offering a wide range of products and services
      </Heading>

      <Copy className="mt-8" variant="large">
        Looking for some inspiration? We can shape stone for almost anything you
        can imagine, <Bold>residential and commercial</Bold>. Just send us a
        message and we can talk through the possibilities.
      </Copy>
    </Wrapper>

    <Wrapper>
      <Columns columns="3" gap="14" className="mt-16">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </Columns>
    </Wrapper>
  </div>
)

export default ProductsAndServices

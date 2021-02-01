import React, { FunctionComponent } from 'react'
import { PrimaryButton } from '../components/Button'
import Layout from '../components/Layout'

const LandingPage: FunctionComponent = () => (
  <Layout>
    <div className="h-screen bg-gray-800">
      <h1 className="font-semibold text-5xl">
        Experience the North Coast Marble &amp; Granite Advantage.
      </h1>
      <p className="text-xl max-w-prose">
        Whether you are in search of the classic beauty and unique appeal of
        natural stone or the robustness and clean lines of engineered quartz, at
        NCMG we have got you covered.
      </p>
      <PrimaryButton>Request a quote! It's easy</PrimaryButton>
    </div>
  </Layout>
)

export default LandingPage

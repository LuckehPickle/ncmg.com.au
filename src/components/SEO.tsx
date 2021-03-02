import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl
        defaultImage: image
      }
    }
  }
`

const SEO: React.FunctionComponent<SEOProps> = (props) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)
  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
  } = site.siteMetadata

  const title = props.title ?? defaultTitle
  const description = props.description ?? defaultDescription
  const image = `${siteUrl}${props.image || defaultImage}`

  return (
    <Helmet title={title} titleTemplate={titleTemplate}>
      <html lang="en-AU" />
      {props.noIndex && <meta name="robots" content="noindex" />}
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta property="og:url" content={`${siteUrl}${pathname}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO

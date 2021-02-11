module.exports = {
  siteMetadata: {
    title: 'North Coast Marble & Granite',
    description:
      'We offer kitchens, bathrooms, and more. With the latest machinery and a team of highly experienced trade staff, we can service your needs. Request a quote today, to experience the NCMG advantage firsthand.',
    siteUrl: `https://www.ncmg.com.au`,
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-postcss',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
      },
    },
  ],
}

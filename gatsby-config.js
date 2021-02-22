module.exports = {
  siteMetadata: {
    title: 'North Coast Marble & Granite',
    titleTemplate: '%s - NCMG',
    description:
      'We create benchtops, vanities and more. With the latest machinery and a team of highly experienced trade staff, we can complete any job throughout the Mid North Coast.',
    siteUrl: `https://www.ncmg.com.au`,
    image: '/ncmg.png'
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
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'North Coast Marble & Granite',
        short_name: 'NCMG',
        start_url: '/',
        background_color: '#0F1315',
        theme_color: '#0F1315',
        display: 'minimal-ui',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-catch-links',
  ],
}

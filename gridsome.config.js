// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Emmanuel Odongo',
  siteDescription: 'Developer & Mechanical Keyboard Enthusiast',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/.temp/*.md',
        typeName: 'BlogPost',
        route: '/:slug'
      }
    },
    {
      use: 'gridsome-plugin-pug'
    }
  ],
  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      squeezeParagraphs: true,
      plugins: [
        // '@crocc/gridsome-remark-hljs'
      ]
    }
  }
}

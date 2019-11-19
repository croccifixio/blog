<template lang="pug">
  Layout.blog-list
    ul
      li(v-for="{ node } in $page.allBlogPost.edges" :key="node._id")
        article
          .header
            h2
              router-link(:to="node.path")
                span.title(v-html="node.title")
            time(:datetime="node.date") {{ node.prettyDate }}
          .description(v-html="node.description")
</template>

<page-query>
  query Home ($page: Int) {
    allBlogPost (page: $page) {
      edges {
        node {
          id
          title
          prettyDate: date(format: "D MMMM, YYYY")
          date (format: "YYYY-MM-DD")
          description
          path
        }
      }
    }
  }
</page-query>

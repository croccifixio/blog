<template lang="pug">
  Layout
    .blog-post
      h1(v-html="$page.blogPost.title")
      time(:datetime="$page.blogPost.date") {{ $page.blogPost.prettyDate }}
      .content(v-html="$page.blogPost.content")
</template>

<script>
export default {
  metaInfo () {
    return {
      title: this.$page.blogPost.title
    }
  }
}
</script>

<page-query>
  query BlogPost ($path: String!) {
    blogPost (path: $path) {
      title
      prettyDate: date(format: "D MMMM, YYYY")
      date (format: "YYYY-MM-DD")
      content
    }
  }
</page-query>

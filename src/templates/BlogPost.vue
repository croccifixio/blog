<template lang="pug">
  Layout
    .blog-post
      h1(v-html="$page.blogPost.title")
      time(:datetime="$page.blogPost.date") {{ $page.blogPost.prettyDate }}
      .content(v-html="$page.blogPost.content")
</template>

<script>
import ScrollTo from '~/assets/scripts/scroll-to'

export default {
  metaInfo () {
    return {
      title: this.$page.blogPost.seo_title
    }
  },
  mounted() {
    const $$scrollToTriggers = ScrollTo.getTriggers()

    $$scrollToTriggers.forEach(ScrollTo.addTriggerListener)
  },
}
</script>

<page-query>
  query BlogPost ($path: String!) {
    blogPost (path: $path) {
      seo_title
      title
      prettyDate: date(format: "D MMMM, YYYY")
      date (format: "YYYY-MM-DD")
      content
    }
  }
</page-query>

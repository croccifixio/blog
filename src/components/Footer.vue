<template lang="pug">
  footer
    div(v-if="type === 'about'") &mdash;#{" "}
      router-link(to="/about") Emmanuel
    div(v-else-if="type === 'home'")
      router-link(to="/")
        span(lang="sw") Mwenda tezi na omo, marejeo ni ngamani
</template>

<script>
export default {
  props: {
    type: {
      default: 'about',
      type: String
    }
  }
}
</script>

<template lang="pug">
  .layout
    //- header
    //-   g-link.heading-link(:to="{ name: 'home' }")
    //-     component.heading(:is="titleTag") {{ config.siteName }}
    transition(name="fade" appear)
      main
        slot
    Footer
</template>

<script>
import config from '~/.temp/config.js';

export default {
  computed: {
    titleTag () {
      return this.$route.name === 'home' ? 'h1' : 'h6'
    },
    config () {
      return config
    }
  }
}
</script>


<style lang="css">
  .fade-enter-active {
    transition: opacity .5s;
  }

  .fade-enter {
    opacity: 0;
  }
</style>

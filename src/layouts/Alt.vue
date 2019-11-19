<template lang="pug">
  .layout
    transition(name="fade" appear)
      main
        slot
    Footer(type="home")
</template>

<style lang="css">
  .fade-enter-active {
    transition: opacity .5s;
  }

  .fade-enter {
    opacity: 0;
  }
</style>

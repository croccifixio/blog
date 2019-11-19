import '~/assets/style/index.styl'

import DefaultLayout from '~/layouts/Default.vue'
import AltLayout from '~/layouts/Alt.vue'
import Footer from '~/components/Footer.vue'

export default function (Vue, { router, head, isClient }) {
  Vue.component('Layout', DefaultLayout)
  Vue.component('AltLayout', AltLayout)
  Vue.component('Footer', Footer)
}

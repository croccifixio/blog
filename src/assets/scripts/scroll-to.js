import { $, $$ } from './_utils'

class ScrollTo {
  static addTriggerListener = $trigger => {
    $trigger?.addEventListener('click', this.handleClick($trigger))
  }

  static getTriggers = () => $$('a[href^="#"')

  static handleClick = $trigger => event => {
    event.preventDefault()
    const $target = $($trigger.getAttribute('href'))

    $target?.scrollIntoView({
      behavior: 'smooth',
    })
  }
}

export default ScrollTo

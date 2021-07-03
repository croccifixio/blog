export const $ = (selector, base = document) => base.querySelector(selector)

export const $$ = (selector, base = document) => Array.from(base.querySelectorAll(selector))

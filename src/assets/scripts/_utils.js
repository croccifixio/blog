export const $ = (selector, baseElement = document) => baseElement?.querySelector(selector)

export const $$ = (selector, baseElement = document) =>
  [].slice.call(baseElement?.querySelectorAll(selector) || [])

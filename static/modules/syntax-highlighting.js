import { $$ } from './utils.js'

export class SyntaxHighlighting {
  static getUnderlinedElements() {
    return $$('[style*="text-decoration:underline"]')
  }

  static trimTrailingWhitespace(element) {
    const content = element.textContent
    if (!/\s$/.test(content)) return
    element.textContent = content.trimEnd()
    element.insertAdjacentHTML('afterEnd', '<span> </span>')
  }
}

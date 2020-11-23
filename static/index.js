import { SyntaxHighlighting } from './modules/syntax-highlighting.js'

SyntaxHighlighting
  .getUnderlinedElements()
  .forEach(SyntaxHighlighting.trimTrailingWhitespace)

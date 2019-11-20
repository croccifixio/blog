const { camelCase, kebabCase, paramCase, sentenceCase, titleCase } = require('change-case')
const currentDate = new Date()
const day = `${currentDate.getDate()}`.padStart(2, '0')
const month = `${currentDate.getMonth() + 1}`.padStart(2, '0')
const year = currentDate.getFullYear()
const reverse = arr => Array.from(arr).reverse()

module.exports = {
  helpers: {
    camelCase,
    kebabCase,
    titleCase: str => titleCase(sentenceCase(str)),
    paramCase,
    date: () => `${year}-${month}-${day}`,
    nbsp: str => {
      const words = str.split(' ')
      const [ lastWord, ...reversedLeadingWords ] = reverse(words)
      const leadingWords = reverse(reversedLeadingWords)

      if (lastWord.length < 5) return str
      return [leadingWords.join(' '), lastWord].join('&nbsp;')
    },
  }
}

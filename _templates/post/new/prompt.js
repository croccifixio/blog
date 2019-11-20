// see types of prompts:
// https://github.com/SBoudrias/Inquirer.js#prompt-types
//
// and for examples for prompts:
// https://github.com/SBoudrias/Inquirer.js/tree/master/examples
module.exports = [
  {
    type: 'input',
    name: 'postTitle',
    message: "Post title: ",
  },
  {
    type: 'input',
    name: 'tags',
    message: "Tags: (comma-separated) ",
  },
]

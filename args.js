const command = require('command-line-args')
const options = [  
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Display this usage guide.'
  },
  { name: 'sign', alias: 's', type: Boolean },
  { name: 'verify', alias: 'v', type: Boolean }
]
const args = command(options)

if (args.help) {
  const usage = command([
    {
      header: 'Typical Example',
      content: 'A simple example demonstrating typical usage.'
    },
    {
      header: 'Options',
      optionList: options
    },
    {
      content: 'Project home: {underline https://github.com/irony/hcert}'
    }
  ])
  console.log(usage)
} else {
  console.log(options)
}

module.exports = args
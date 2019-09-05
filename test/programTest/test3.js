const _ = require('lodash')

var x = _.debounce(() => { console.log(3) }, 3000)
x()
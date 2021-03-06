#!/usr/bin/env node
'use strict'

var pack = require('./package.json')
var soundex = require('.')

var argv = process.argv.slice(2)

if (argv.indexOf('--help') !== -1 || argv.indexOf('-h') !== -1) {
  console.log(help())
} else if (argv.indexOf('--version') !== -1 || argv.indexOf('-v') !== -1) {
  console.log(pack.version)
} else if (argv.length === 0) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function(data) {
    console.log(phonetics(data))
  })
} else {
  console.log(phonetics(argv.join(' ')))
}

function phonetics(values) {
  return values
    .split(/\s+/g)
    .map(function(value) {
      return soundex(value)
    })
    .join(' ')
}

function help() {
  return [
    '',
    '  Usage: ' + pack.name + ' [options] <words...>',
    '',
    '    ' + pack.description,
    '',
    '  Options:',
    '',
    '    -h, --help           output usage information',
    '    -v, --version        output version number',
    '',
    '  Usage:',
    '',
    '  # output phonetics',
    '  $ ' + pack.name + ' phonetics unicorn',
    '  ' + phonetics('phonetics unicorn'),
    '',
    '  # output phonetics from stdin',
    '  $ echo "phonetics banana" | ' + pack.name,
    '  ' + phonetics('phonetics banana'),
    ''
  ].join('\n')
}

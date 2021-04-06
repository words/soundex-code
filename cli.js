#!/usr/bin/env node
import fs from 'fs'
import {soundex} from './index.js'

var pack = JSON.parse(
  fs.readFileSync(new URL('./package.json', import.meta.url))
)

var argv = process.argv.slice(2)

if (argv.includes('--help') || argv.includes('-h')) {
  console.log(help())
} else if (argv.includes('--version') || argv.includes('-v')) {
  console.log(pack.version)
} else if (argv.length === 0) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function (data) {
    console.log(phonetics(data))
  })
} else {
  console.log(phonetics(argv.join(' ')))
}

function phonetics(values) {
  return values
    .split(/\s+/g)
    .map(function (value) {
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

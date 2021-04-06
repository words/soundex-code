#!/usr/bin/env node
import {URL} from 'url'
import fs from 'fs'
import {soundex} from './index.js'

/** @type {Object.<string, unknown>} */
var pack = JSON.parse(
  String(fs.readFileSync(new URL('./package.json', import.meta.url)))
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
    console.log(phonetics(String(data)))
  })
} else {
  console.log(phonetics(argv.join(' ')))
}

/** @param {string} values  */
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

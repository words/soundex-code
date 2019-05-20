'use strict'

/* eslint-env browser */

var soundex = require('soundex-code')

var $input = document.querySelector('input')
var $output = document.querySelector('output')

$input.addEventListener('input', oninputchange)

oninputchange()

function oninputchange() {
  $output.textContent = soundex($input.value)
}

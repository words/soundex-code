#!/usr/bin/env node
'use strict';

/*
 * Dependencies.
 */

var soundex,
    pack;

soundex = require('./');
pack = require('./package.json');

/*
 * Detect if a value is expected to be piped in.
 */

var expextPipeIn;

expextPipeIn = !process.stdin.isTTY;

/*
 * Arguments.
 */

var argv;

argv = process.argv.slice(2);

/*
 * Command.
 */

var command;

command = Object.keys(pack.bin)[0];

/**
 * Get the soundex of a list of words.
 *
 * @param {Array.<string>} values
 * @return {string}
 */
function phonetics(values) {
    return values.map(function (value) {
        return soundex(value);
    }).join(' ');
}

/**
 * Help.
 *
 * @return {string}
 */
function help() {
    return [
        '',
        'Usage: ' + command + ' [options] <words...>',
        '',
        pack.description,
        '',
        'Options:',
        '',
        '  -h, --help           output usage information',
        '  -v, --version        output version number',
        '',
        'Usage:',
        '',
        '# output phonetics',
        '$ ' + command + ' phonetics unicorn',
        '# ' + phonetics(['phonetics', 'unicorn']),
        '',
        '# output phonetics from stdin',
        '$ echo "phonetics banana" | ' + command,
        '# ' + phonetics(['phonetics', 'banana']),
        ''
    ].join('\n  ') + '\n';
}

/**
 * Get the phonetics of a list of words.
 *
 * @param {string?} value
 */
function getSoundex(value) {
    if (value) {
        console.log(phonetics(value.split(/\s+/g)));
    } else {
        process.stderr.write(help());
        process.exit(1);
    }
}

/*
 * Program.
 */

if (
    argv.indexOf('--help') !== -1 ||
    argv.indexOf('-h') !== -1
) {
    console.log(help());
} else if (
    argv.indexOf('--version') !== -1 ||
    argv.indexOf('-v') !== -1
) {
    console.log(pack.version);
} else if (argv.length) {
    getSoundex(argv.join(' '));
} else if (!expextPipeIn) {
    getSoundex();
} else {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (data) {
        getSoundex(data.trim());
    });
}

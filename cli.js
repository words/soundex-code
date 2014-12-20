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
 */
function getPhonetics(values) {
    return values.map(function (value) {
        return soundex(value);
    });
}

/**
 * Help.
 */
function help() {
    return [
        '',
        'Usage: ' + command + ' [options] words...',
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
        '# output phonetics for words',
        '$ ' + command + ' soundex unicorn',
        '# ' + getPhonetics(['soundex', 'unicorn']).join(' '),
        '',
        '# output phonetics for words from stdin',
        '$ echo "soundex unicorn banana" | ' + command,
        '# ' + getPhonetics(['soundex', 'unicorn', 'banana']).join(' ')
    ].join('\n  ') + '\n';
}

/**
 * Get the phonetics of a list of words.
 *
 * @param {Array.<string>} values
 */
function getSoundex(values) {
    if (values.length) {
        console.log(getPhonetics(values).join(' '));
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
} else if (argv[0]) {
    getSoundex(argv.join(' ').split(/\s+/g));
} else {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (data) {
        getSoundex(data.trim().split(/\s+/g));
    });
}
